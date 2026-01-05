import { getCountryGroups } from '@/supabase/api/country_groups';
import { useQuery } from '@tanstack/react-query';

export const useCountryGroups = () => {
	return useQuery({
		queryKey: ['country-groups'],
		queryFn: () => getCountryGroups()
	});
};
