import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';

export const getTimeSeriesData = async (sourceId: number, countryCode: string) => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.WORLD_BANK_DATA)
		.select('period, value')
		.eq('country_code', countryCode)
		.eq('source_id', sourceId)
		.order('period', { ascending: true });
	if (error) throw error;
	return data;
};
