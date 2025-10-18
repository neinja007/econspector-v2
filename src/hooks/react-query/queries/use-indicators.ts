import { getIndicators } from '@/api/indicators';
import { Indicator } from '@/types/indicator';
import { useQuery } from '@tanstack/react-query';

export const useIndicators = (categoryId: string) => {
	return useQuery<Indicator[]>({
		queryKey: ['indicators', categoryId],
		queryFn: () => getIndicators(categoryId)
	});
};
