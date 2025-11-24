import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { adminSupabase } from '@/supabase/clients/admin';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const retryRequest = async <T>(requestFn: () => Promise<T>, maxRetries: number = 3): Promise<T> => {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await requestFn();
		} catch (error) {
			if (attempt === maxRetries) {
				throw error;
			}
			console.log(`Attempt ${attempt} failed, retrying in ${attempt * 2000}ms...`);
			await delay(attempt * 2000);
		}
	}
	throw new Error('Retry function should not reach this point');
};

const processBatch = async <T>(requests: Promise<T>[], batchSize: number = 5): Promise<T[]> => {
	const results: T[] = [];
	for (let i = 0; i < requests.length; i += batchSize) {
		const batch = requests.slice(i, i + batchSize);
		console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(requests.length / batchSize)}`);

		try {
			const batchResults = await Promise.all(batch);
			results.push(...batchResults);

			if (i + batchSize < requests.length) {
				await delay(100);
			}
		} catch (error) {
			console.error('Batch processing error:', error);
		}
	}
	return results;
};

export const POST = async () => {
	const worldBankCountries = await adminSupabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.COUNTRIES)
		.select('*')
		.eq('world_bank', true);

	if (!worldBankCountries.data) {
		return NextResponse.json({ error: 'No world bank countries found' }, { status: 404 });
	}

	const worldBankSources = await adminSupabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.FREQUENCY_SOURCES)
		.select('*')
		.eq('name', 'World Bank');

	if (!worldBankSources.data) {
		return NextResponse.json({ error: 'No world bank sources found' }, { status: 404 });
	}

	const allRequests = [];

	for (const country of worldBankCountries.data) {
		for (const source of worldBankSources.data) {
			allRequests.push(
				retryRequest(async () => {
					const res = await axios.get(
						`https://api.worldbank.org/v2/countries/${country.cca3}/indicators/${source.code}?per_page=10000&format=json`,
						{
							timeout: 30000,
							headers: {
								'User-Agent': 'EconSpector/1.0'
							}
						}
					);

					return {
						country_code: country.cca3,
						source_id: source.id,
						data: res.data[1] ?? []
					};
				}).catch((err) => {
					console.error(`Failed to fetch ${country.cca3} ${source.code} after retries:`, err.message);
					return null;
				})
			);
		}
	}

	console.log(`Total requests to process: ${allRequests.length}`);

	const results = await processBatch(allRequests, 3);
	const successfulResults = results.filter(Boolean);

	console.log(`Successfully processed ${successfulResults.length} out of ${allRequests.length} requests`);

	const allDataToInsert = [];

	for (const result of successfulResults) {
		if (result && result.data && result.data.length > 0) {
			const transformedData = result.data
				.filter((item: { date: string; value: number }) => item.value)
				.map((item: { date: string; value: number }) => ({
					country_code: result.country_code,
					source_id: result.source_id,
					period: item.date,
					value: item.value
				}));

			allDataToInsert.push(...transformedData);
		}
	}

	if (allDataToInsert.length > 0) {
		const BATCH_SIZE = 1000;
		try {
			for (let i = 0; i < allDataToInsert.length; i += BATCH_SIZE) {
				const batch = allDataToInsert.slice(i, i + BATCH_SIZE);
				const { error } = await adminSupabase
					.schema(DatabaseSchema.DATA)
					.from(DatabaseTable.WORLD_BANK_DATA)
					.upsert(batch);

				console.log(`Inserted batch ${i / BATCH_SIZE + 1}: ${batch.length} records`);

				if (error) {
					console.error(`Error inserting batch ${i / BATCH_SIZE + 1}:`, error);
					return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
				}
			}
			console.log(`Successfully inserted ${allDataToInsert.length} records in batches`);
		} catch (err) {
			console.error('Unexpected error during insertion:', err);
			return NextResponse.json({ error: 'Unexpected error during insertion' }, { status: 500 });
		}
	}

	return NextResponse.json({
		message: 'World bank data imported successfully',
		recordsInserted: allDataToInsert.length
	});
};

export const DELETE = async () => {
	await adminSupabase.schema(DatabaseSchema.DATA).from(DatabaseTable.WORLD_BANK_DATA).delete().neq('id', 0);

	return NextResponse.json({ message: 'World bank data deleted successfully' });
};
