import { supabase } from '@/supabase/clients/client';

async function getCountries() {
	const { data, error } = await supabase
		.schema('data')
		.from('countries')
		.select('*')
		.order('name', { ascending: true });
	if (error) throw error;
	return data;
}

// TODO: use maybesingle everywhere you need to, like below

async function getCountry(code: string) {
	const { data, error } = await supabase
		.schema('data')
		.from('countries_with_currencies')
		.select('*')
		.eq('cca3', code)
		.maybeSingle();
	if (error) throw error;
	if (!data) {
		return undefined;
	}
	return data;
}

const getRankedCountries = async (
	type: 'countries' | 'regions' | 'subregions',
	sourceId: number,
	timePeriod: [number, number] | null
) => {
	const { data } = await supabase.schema('data').rpc('get_ranked_countries', {
		p_level: type,
		p_source_id: sourceId,
		p_start_year: timePeriod?.[0] ?? 0,
		p_end_year: timePeriod?.[1] ?? 0
	});
	return data;
};

export { getCountries, getCountry, getRankedCountries };
