import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { Subregion } from '@/types/subregion';

async function getSubregions(): Promise<{ data: Subregion[]; count: number }> {
	const { data, error, count } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.SUBREGIONS)
		.select('*', {
			count: 'estimated'
		})
		.order('name', { ascending: true });
	if (error) throw error;
	return { data, count: count ?? 0 };
}

export { getSubregions };
