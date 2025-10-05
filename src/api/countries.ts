import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { Country } from '@/types/country';

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

export { getCountries };
