import { getIndicatorCategories } from '@/api/indicator-categories';
import { IndicatorCategory } from '@/types/indicator-category';
import { useQuery } from '@tanstack/react-query';

export function useIndicatorCategories() {
	return useQuery<IndicatorCategory[]>({
		queryKey: ['indicator-categories'],
		queryFn: () => getIndicatorCategories()
	});
}
