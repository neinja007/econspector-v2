import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { adminSupabase } from '@/supabase/admin';
import { DataSource } from '@/types/data_source';

export const POST = async (req: Request) => {
	const body = await req.json();
	const updateMode = body.update === 'all' || body.update === 'new' ? body.update : 'all';

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
		.eq('name', DataSource.WORLD_BANK);

	console.log('worldBankSources', worldBankSources.data);

	if (!worldBankSources.data) {
		return NextResponse.json({ error: 'No world bank sources found' }, { status: 404 });
	}

	let sourcesToUpdate = [];

	if (updateMode === 'all') {
		sourcesToUpdate = worldBankSources.data;
	} else if (updateMode === 'new') {
		sourcesToUpdate = worldBankSources.data.filter((source) => source.data_updated_at === null);
	}

	for (const source of sourcesToUpdate) {
		console.log(`${source.code}: Fetching data...`);

		const res = await axios.get(
			`https://api.worldbank.org/v2/country/all/indicator/${source.code}?per_page=30000&format=json`,
			{
				timeout: 30000,
				headers: {
					'User-Agent': 'EconSpector/1.0'
				}
			}
		);

		const data: {
			indicator: { id: string; value: number };
			country: { id: string; value: string };
			countryiso3code: string;
			date: string;
			value: number | null;
			obs_status: string;
			decimal: number;
		}[] = res.data[1];

		console.log(`${source.code}: Received ${data.length} data points.`);

		const insertableData = data
			.filter(
				(item) =>
					item.value !== null &&
					item.value !== undefined &&
					worldBankCountries.data?.some((country) => country.cca3 === item.countryiso3code)
			)
			.map((item) => ({
				source_id: source.id,
				country_code: item.countryiso3code,
				period: item.date,
				value: item.value
			}));

		console.log(`${source.code}: Conversion complete.`);

		const { error } = await adminSupabase
			.schema(DatabaseSchema.DATA)
			.from(DatabaseTable.WORLD_BANK_DATA)
			.upsert(insertableData);

		if (error) {
			console.error(`Error inserting data:`, error);
			return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
		}

		console.log(`${source.code}: Insertion complete.`);

		await adminSupabase
			.schema(DatabaseSchema.DATA)
			.from(DatabaseTable.INDICATORS)
			.update({
				data_updated_at: new Date().toISOString()
			})
			.eq('id', source.indicator_id);

		console.log(`${source.code}: Indicator date updated successfully.`);
	}

	return NextResponse.json({ message: 'Data inserted successfully' });
};

export const DELETE = async () => {
	await adminSupabase.schema(DatabaseSchema.DATA).from(DatabaseTable.WORLD_BANK_DATA).delete().neq('id', 0);
	return NextResponse.json({ message: 'World bank data deleted successfully' });
};
