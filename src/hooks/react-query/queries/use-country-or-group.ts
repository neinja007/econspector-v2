import { getCountry } from '@/supabase/api/countries';
import { getCountryGroup } from '@/supabase/api/country_groups';
import { CountryGroup, CountryWithCurrencies } from '@/types/country';
import { useQuery } from '@tanstack/react-query';

export function useCountryOrGroup(type: 'country' | 'group', code: string) {
	return useQuery<CountryWithCurrencies | CountryGroup>({
		queryKey: ['country-or-groups', type, code],
		queryFn: () => (type === 'country' ? getCountry(code) : getCountryGroup(code))
	});
}
