import { getTimeSeriesData } from '@/api/time-series-data';
import { useQuery } from '@tanstack/react-query';

export const useTimeSeriesData = (sourceId: number, countryCode: string) => {
	return useQuery<{ period: string; value: number }[]>({
		queryKey: ['time-series-data', sourceId, countryCode],
		enabled: !!sourceId && !!countryCode,
		queryFn: () => getTimeSeriesData(sourceId, countryCode)
	});
};
