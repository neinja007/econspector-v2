import { getRegions } from '@/api/regions';
import { Region } from '@/types/region';
import { useQuery } from '@tanstack/react-query';

export const useRegions = () => {
	return useQuery<{ data: Region[]; count: number }>({
		queryKey: ['regions'],
		queryFn: () => getRegions()
	});
};
