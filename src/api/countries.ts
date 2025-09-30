import { supabase } from '@/supabase/client';
import { Country } from '@/types/country';

async function getCountries(): Promise<Country[]> {
	const { data, error } = await supabase.from('countries').select('*');
	if (error) throw error;
	return data;
}

export { getCountries };
