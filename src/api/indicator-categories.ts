import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { IndicatorCategory } from '@/types/indicator-category';

async function getIndicatorCategories(): Promise<IndicatorCategory[]> {
	const { data, error } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.INDICATOR_CATEGORIES)
		.select('*')
		.order('name', { ascending: true });
	if (error) throw error;
	return data;
}

export { getIndicatorCategories };
