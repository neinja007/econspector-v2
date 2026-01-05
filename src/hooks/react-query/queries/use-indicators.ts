import { getIndicators } from '@/supabase/api/indicators';
import { useQuery } from '@tanstack/react-query';

export const useIndicators = (groupId?: number) => {
	return useQuery({
		queryKey: ['indicators', groupId],
		queryFn: () => getIndicators(groupId ?? null)
	});
};
