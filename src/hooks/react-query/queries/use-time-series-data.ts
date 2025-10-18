import { getTimeSeriesData } from '@/api/time-series-data';
import { FrequencySource } from '@/types/indicator';
import { useQuery } from '@tanstack/react-query';

export const useTimeSeriesData = (source: FrequencySource | null, countryCode: string) => {
	return useQuery<{ period: string; value: number }[]>({
		queryKey: ['time-series-data', source, countryCode],
		enabled: !!source && !!countryCode,
		queryFn: () => getTimeSeriesData(source!, countryCode)
	});
};
