import { getCountry } from '@/api/country';
import { getRegion } from '@/api/region';
import { getSubregion } from '@/api/subregion';
import { CountryWithCurrencies } from '@/types/country';
import { Region } from '@/types/region';
import { Subregion } from '@/types/subregion';
import { useQuery } from '@tanstack/react-query';

export function useCountryOrRegion(type: 'country' | 'region' | 'subregion', code: string) {
	return useQuery<CountryWithCurrencies | Region | Subregion>({
		queryKey: ['country-or-region', type, code],
		queryFn: () => (type === 'country' ? getCountry(code) : type === 'region' ? getRegion(code) : getSubregion(code))
	});
}
