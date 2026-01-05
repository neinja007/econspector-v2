import { getCountry } from '@/supabase/api/countries';
import { getCountryGroup } from '@/supabase/api/country_groups';
import { DbDataViews } from '@/types/db/alias';
import { CountryGroup } from '@/types/db/types/country-group';
import { useQuery } from '@tanstack/react-query';

export function useCountryOrGroup(type: 'country' | 'group', code: string) {
	return useQuery<DbDataViews<'countries_with_currencies'> | CountryGroup | undefined>({
		queryKey: ['country-or-groups', type, code],
		queryFn: () => (type === 'country' ? getCountry(code) : getCountryGroup(parseInt(code)))
	});
}
