import { removeCountryFromGroup } from '@/supabase/api/country_groups';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveCountryFromGroup = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ countryCode, groupId }: { countryCode: string; groupId: number }) =>
			removeCountryFromGroup(countryCode, groupId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['country-groups'] })
	});
};
