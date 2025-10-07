import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { Country, CountryWithCurrencies } from '@/types/country';

async function getCountries(): Promise<{ data: Country[]; count: number }> {
	const { data, error, count } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.COUNTRIES)
		.select('*', {
			count: 'estimated'
		})
		.order('name', { ascending: true });
	if (error) throw error;
	return { data, count: count ?? 0 };
}

async function getCountry(code: string): Promise<CountryWithCurrencies> {
	const { data, error } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.COUNTRIES)
		.select('*, currencies(*)')
		.eq('cca3', code);
	if (error) throw error;
	return data[0];
}

export { getCountries, getCountry };
