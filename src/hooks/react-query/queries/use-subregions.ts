import { getSubregions } from '@/api/subregions';
import { Subregion } from '@/types/subregion';
import { useQuery } from '@tanstack/react-query';

export const useSubregions = () => {
	return useQuery<{ data: Subregion[]; count: number }>({
		queryKey: ['subregions'],
		queryFn: () => getSubregions()
	});
};
