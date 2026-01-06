import { supabase } from '@/supabase/clients/client';
import { Indicator } from '@/types/db/types/indicators';
import { emptyUuid } from '@/utils/empty-uuid';
import { getUserId } from '@/utils/get-user-id';

async function getIndicators(groupId: number | null) {
	const userId = await getUserId();

	const { data, error } = await supabase
		.schema('data')
		.rpc('get_indicators', { p_group_id: groupId ?? 0, p_user_id: userId ?? emptyUuid });

	if (error) throw error;

	if (!data) {
		return null;
	}

	try {
		return data.map((indicator) => new Indicator(indicator));
	} catch (err) {
		throw err;
	}
}

export { getIndicators };
