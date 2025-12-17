import { getRankedCountries } from '@/supabase/api/countries';
import { useQuery } from '@tanstack/react-query';

export const useRankings = (sourceId: number, timePeriod: [number, number] | null) => {
	return useQuery({
		queryKey: ['rankings', sourceId, timePeriod],
		queryFn: async () => {
			if (!timePeriod) {
				throw new Error('Time period is required');
			}
			try {
				const result = await getRankedCountries('countries', sourceId, timePeriod);
				console.log('useRankings result', result);
				return result;
			} catch (error) {
				console.error('useRankings error', error);
				throw error;
			}
		},
		enabled: !!timePeriod && sourceId > 0,
	});
};
