import { NextResponse } from 'next/server';
import axios from 'axios';
import { adminSupabase } from '@/supabase/clients/admin';
import { DataSource } from '@/types/data_source';
import { DbDataTables } from '@/types/db/tables';

export const POST = async (req: Request) => {
	const body = await req.json();
	const updateMode = body.update === 'all' || body.update === 'new' ? body.update : 'all';

	const worldBankCountries = await adminSupabase.schema('data').from('countries').select('*').eq('world_bank', true);

	if (!worldBankCountries.data) {
		return NextResponse.json({ error: 'No world bank countries found' }, { status: 404 });
	}

	const worldBankSources = await adminSupabase
		.schema('data')
		.from('frequency_sources')
		.select('*, indicator_frequencies(indicator_id)')
		.eq('data_source', DataSource.WORLD_BANK);

	if (!worldBankSources.data) {
		return NextResponse.json({ error: 'No world bank sources found' }, { status: 404 });
	}

	let sourcesToUpdate: DbDataTables<'frequency_sources'>[] = [];

	if (updateMode === 'all') {
		sourcesToUpdate = worldBankSources.data;
	} else if (updateMode === 'new') {
		sourcesToUpdate = worldBankSources.data.filter((source) => source.data_updated_at === null);
	}

	const filteredSources = sourcesToUpdate.filter((source) => source['wb-code'] !== null);

	if (sourcesToUpdate.length !== filteredSources.length) {
		return NextResponse.json({ error: 'Some WB sources have no wb-code, which is fucking bullshit.' }, { status: 400 });
	}

	// TODO maybe use econspector internal indicator codes instead of wb.
	for (const source of filteredSources) {
		console.log(`${source['wb-code']}: Removing existing data...`);

		await adminSupabase.schema('data').from('time_series_data').delete().eq('source_id', source.id);

		console.log(`${source['wb-code']}: Fetching data...`);

		const res = await axios.get(
			`https://api.worldbank.org/v2/country/all/indicator/${source['wb-code']}?per_page=30000&format=json`,
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

		console.log(`${source['wb-code']}: Received ${data.length} data points.`);

		const filteredData = data.filter(
			(item): item is typeof item & { value: number } => item.value !== null && item.value !== undefined
		);

		const mappedData = filteredData.map((item) => ({
			source_id: source.id,
			country_code: item.countryiso3code,
			period: item.date,
			value: item.value
		}));

		console.log(`${source['wb-code']}: Conversion complete.`);

		const { error } = await adminSupabase.schema('data').from('time_series_data').upsert(mappedData);

		if (error) {
			console.error(`Error inserting data:`, error);
			return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
		}

		console.log(`${source['wb-code']}: Insertion complete.`);

		await adminSupabase
			.schema('data')
			.from('frequency_sources')
			.update({
				data_updated_at: new Date().toISOString()
			})
			.eq('id', source.id);

		console.log(`${source['wb-code']}: Indicator date updated successfully.`);
	}

	return NextResponse.json({ message: 'Data inserted successfully' });
};

export const DELETE = async () => {
	await adminSupabase.schema('data').from('time_series_data').delete().neq('id', 0);
	return NextResponse.json({ message: 'World bank data deleted successfully' });
};
