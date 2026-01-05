import { addCountryToGroup } from '@/supabase/api/country_groups';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddCountryToGroup = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ countryCode, groupId }: { countryCode: string; groupId: number }) =>
			addCountryToGroup(countryCode, groupId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['country-groups'] });
		}
	});
};
