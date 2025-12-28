import { getTimeSeriesData } from '@/supabase/api/time-series-data';
import { TimeSeriesData } from '@/types/data';
import { useQuery } from '@tanstack/react-query';

export const useTimeSeriesData = (sourceId: number, countryCode: string) => {
	return useQuery<TimeSeriesData>({
		queryKey: ['time-series-data', sourceId, countryCode],
		enabled: !!sourceId && !!countryCode,
		queryFn: () => getTimeSeriesData(sourceId, countryCode)
	});
};
