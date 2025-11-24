import { getCountries } from '@/supabase/api/countries';
import { Country } from '@/types/country';
import { useQuery } from '@tanstack/react-query';

export const useCountries = () => {
	return useQuery<{ data: Country[]; count: number }>({
		queryKey: ['countries'],
		queryFn: () => getCountries()
	});
};
