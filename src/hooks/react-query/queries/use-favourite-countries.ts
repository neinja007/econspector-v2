import { getFavouriteCountries } from '@/supabase/api/country_groups';
import { useQuery } from '@tanstack/react-query';

export const useFavouriteCountries = () => {
	return useQuery<string[]>({
		queryKey: ['favourite-countries'],
		queryFn: () => getFavouriteCountries()
	});
};
