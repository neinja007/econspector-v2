import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { Indicator } from '@/types/indicator';

async function getIndicators(categoryId: string | null): Promise<Indicator[]> {
	let query = supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.INDICATORS)
		.select('*, indicator_frequencies(*, frequency_sources(*))')
		.is('parent_id', null);

	if (categoryId) {
		query = query.eq('category_id', categoryId);
	}
	const { data, error } = await query;

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
