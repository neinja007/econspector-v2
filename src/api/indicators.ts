import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { Indicator } from '@/types/indicator';

async function getIndicators(categoryId: string): Promise<Indicator[]> {
	const { data, error } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.INDICATORS)
		.select('*')
		.eq('category_id', categoryId);
	if (error) throw error;
	return data;
}

export { getIndicators };
