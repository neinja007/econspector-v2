import { supabase } from '@/supabase/clients/client';
import { Indicator } from '@/types/db/types/indicators';
import { getUserId } from '@/utils/get-user-id';

async function getIndicators(groupId: number | null) {
	const userId = await getUserId();

	const { data, error } = await supabase
		.schema('data')
		.rpc('get_indicators', { p_group_id: groupId ?? 0, p_user_id: userId ?? '' });

	if (error) throw error;
	return data?.map((indicator) => new Indicator(indicator)) ?? null;
}

export { getIndicators };
