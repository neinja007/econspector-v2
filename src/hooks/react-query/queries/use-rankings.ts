import { getRankedCountries } from '@/supabase/api/countries';
import { useQuery } from '@tanstack/react-query';

export const useRankings = (sourceId: number, timePeriod: [number, number]) => {
	return useQuery({
		queryKey: ['rankings', sourceId, timePeriod],
		queryFn: () => getRankedCountries('countries', sourceId, timePeriod)
	});
};
