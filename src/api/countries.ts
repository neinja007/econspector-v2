import { supabase } from '@/supabase/client';
import { Country } from '@/types/country';

async function getCountries(): Promise<{ data: Country[]; count: number }> {
	const { data, error, count } = await supabase
		.schema('data')
		.from('countries')
		.select('*', {
			count: 'estimated'
		})
		.order('name', { ascending: true });
	if (error) throw error;
	return { data, count: count ?? 0 };
}

export { getCountries };
