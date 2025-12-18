import { getRankedCountries } from '@/supabase/api/countries';
import { useQuery } from '@tanstack/react-query';

export const useRankings = (sourceId: number, timePeriod: [number, number] | null) => {
	return useQuery({
		queryKey: ['rankings', sourceId, timePeriod],
		queryFn: async () => await getRankedCountries('countries', sourceId, timePeriod),
		enabled: !!sourceId && !!timePeriod
	});
};
