'use client';

import { useCountries } from '@/hooks/react-query/queries/use-countries';

const CountriesPage = () => {
	const { data: countries } = useCountries();

	return (
		<div>
			{countries?.data.map((country) => (
				<div key={country.country_code}>{country.name}</div>
			))}
		</div>
	);
};

export default CountriesPage;
