import { getCountries } from '@/api/countries';
import { Country } from '@/types/country';
import { useQuery } from '@tanstack/react-query';

export const useCountries = () => {
	return useQuery<Country[]>({
		queryKey: ['countries'],
		queryFn: () => getCountries()
	});
};
