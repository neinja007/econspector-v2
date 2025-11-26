import { addFavouriteCountry, removeFavouriteCountry } from '@/supabase/api/favourite-countries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleFavouriteCountry = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ countryCode, action }: { countryCode: string; action: 'add' | 'remove' }) =>
			action === 'add' ? addFavouriteCountry(countryCode) : removeFavouriteCountry(countryCode),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['favourite-countries'] });
		}
	});
};
