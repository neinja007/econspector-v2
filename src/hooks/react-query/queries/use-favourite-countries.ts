import { getFavouriteCountries } from '@/supabase/api/favourite-countries';
import { useQuery } from '@tanstack/react-query';

export const useFavouriteCountries = () => {
	return useQuery<string[]>({
		queryKey: ['favourite-countries'],
		queryFn: () => getFavouriteCountries()
	});
};
