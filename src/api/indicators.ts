import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { Indicator } from '@/types/indicator';

async function getIndicators(categoryId: string): Promise<Indicator[]> {
	const { data, error } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.INDICATORS)
		.select('*, indicator_frequencies(*, frequency_sources(*))')
		.eq('category_id', categoryId);

	const children = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.INDICATORS)
		.select('*, indicator_frequencies(*, frequency_sources(*))')
		.in('parent_id', data?.map((indicator) => indicator.id) ?? []);

	if (error) throw error;
	return data?.map((indicator) => ({
		...indicator,
		children: children?.data?.filter((child) => child.parent_id === indicator.id) ?? []
	}));
}

export { getIndicators };
