import { supabase } from '@/supabase/clients/client';

export const getTimeSeriesData = async (sourceId: number, countryCode: string) => {
	const { data, error } = await supabase
		.schema('data')
		.from('time_series_data')
		.select('period, value')
		.eq('country_code', countryCode)
		.eq('source_id', sourceId)
		.order('period', { ascending: true });
	if (error) throw error;
	return data;
};
