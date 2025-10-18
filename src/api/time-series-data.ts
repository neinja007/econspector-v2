import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { DataSourceEnum } from '@/types/data_source';
import { FrequencySource } from '@/types/indicator';

export const getTimeSeriesData = async (source: FrequencySource, countryCode: string) => {
	if (source.name === DataSourceEnum.WORLD_BANK) {
		const { data, error } = await supabase
			.schema(DatabaseSchema.DATA)
			.from(DatabaseTable.WORLD_BANK_DATA)
			.select('period, value')
			.eq('country_code', countryCode)
			.eq('source_id', source.id)
			.order('period', { ascending: true });
		if (error) throw error;
		return data;
	}
	throw new Error(`Unsupported source: ${source.name}`);
};
