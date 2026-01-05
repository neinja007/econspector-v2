import { getIndicators } from '@/supabase/api/indicators';
import { useQuery } from '@tanstack/react-query';

export const useIndicators = (categoryId?: number) => {
	return useQuery({
		queryKey: ['indicators', categoryId],
		queryFn: () => getIndicators(categoryId || null)
	});
};
