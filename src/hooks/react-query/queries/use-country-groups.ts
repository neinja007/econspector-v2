import { getCountryGroups } from '@/supabase/api/country_groups';
import { useQuery } from '@tanstack/react-query';

export const useCountryGroups = () => {
	return useQuery<{ id: string; name: string; description: string; core: boolean; countries: string[] }[]>({
		queryKey: ['country-groups'],
		queryFn: () => getCountryGroups()
	});
};
