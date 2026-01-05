import { getCountries } from '@/supabase/api/countries';
import { useQuery } from '@tanstack/react-query';

export const useCountries = () => {
	return useQuery({
		queryKey: ['countries'],
		queryFn: () => getCountries()
	});
};
