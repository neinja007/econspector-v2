import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { Region } from '@/types/region';

async function getRegions(): Promise<{ data: Region[]; count: number }> {
	const { data, error, count } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.REGIONS)
		.select('*', {
			count: 'estimated'
		})
		.order('name', { ascending: true });
	if (error) throw error;
	return { data, count: count ?? 0 };
}

export { getRegions };
