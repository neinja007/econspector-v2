import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { adminSupabase } from '@/supabase/admin';

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

	for (const country of worldBankCountries.data) {
		for (const source of worldBankSources.data) {
			const data = await axios
				.get(
					`https://api.worldbank.org/v2/countries/${country.country_code}/indicators/${source.code}?per_page=10000&format=json`
				)
				.then((res) => res.data[1]);

			await adminSupabase
				.schema(DatabaseSchema.DATA)
				.from(DatabaseTable.WORLD_BANK_DATA)
				.insert(
					data
						.filter((item: { value: number; date: string }) => item.value !== null)
						.map((item: { value: number; date: string }) => ({
							country_code: country.country_code,
							source_id: source.id,
							value: item.value,
							period: item.date
						}))
				);

			console.log(`Imported ${data.length} data points for ${country.country_code} and ${source.code}`);
		}
	}

	return NextResponse.json({ message: 'World bank data imported successfully' });
};

export const DELETE = async () => {
	if (process.env.ENABLE_ADMIN_SCRIPTS !== 'true') {
		return NextResponse.json({ message: 'Admin scripts are not enabled. Nice try.' }, { status: 403 });
	}

	await adminSupabase.schema(DatabaseSchema.DATA).from(DatabaseTable.WORLD_BANK_DATA).delete().neq('id', 0);

	return NextResponse.json({ message: 'World bank data deleted successfully' });
};
