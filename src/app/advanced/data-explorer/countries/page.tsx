'use client';

import { useCountries } from '@/hooks/react-query/queries/use-countries';

const CountriesPage = () => {
	const { data: countries } = useCountries();

	return (
		<div>
			{countries?.map((country) => (
				<div key={country.cca3}>{country.name}</div>
			))}
		</div>
	);
};

export default CountriesPage;
