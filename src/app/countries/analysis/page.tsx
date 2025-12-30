'use client';

import { Checkbox } from '@/components/shadcn/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/shadcn/ui/input-group';
import { Label } from '@/components/shadcn/ui/label';
import useSearch from '@/hooks/use-search';
import { useCountries } from '@/hooks/react-query/queries/use-countries';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SearchResults } from './components/search-results';
import { CountryOrGroup } from './types/search-results';
import { useCountryGroups } from '@/hooks/react-query/queries/use-country-groups';

const CountriesAnalysisPage = () => {
	const [search, setSearch] = useState('');

	const [showCountries, setShowCountries] = useState(true);
	const [showGroups, setShowGroups] = useState(false);

	const { data: countries } = useCountries();
	const { data: countryGroups } = useCountryGroups();

	const searchList: CountryOrGroup[] = useMemo(
		() => [
			...(showCountries ? countries?.data.map((country) => ({ type: 'country' as const, data: country })) || [] : []),
			...(showGroups ? countryGroups?.map((group) => ({ type: 'group' as const, data: group })) || [] : [])
		],
		[showCountries, showGroups, countries, countryGroups]
	);

	const searchResults = useSearch(searchList, search, [
		'data.cca3',
		'data.name',
		'data.full_name',
		'data.cca2',
		'data.ccn3',
		'data.cioc',
		'data.capital',
		'data.countries'
	]);

	return (
		<div>
			<div className='flex items-center gap-4'>
				<InputGroup className='shrink'>
					<InputGroupInput
						placeholder='Search for a country or group...'
						autoFocus
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<InputGroupAddon>
						<Search />
					</InputGroupAddon>
				</InputGroup>
				<div className='flex items-center gap-1.5 whitespace-nowrap'>
					<Checkbox
						id='show-countries'
						checked={showCountries}
						onCheckedChange={(checked) => setShowCountries(checked === 'indeterminate' ? false : checked)}
					/>
					<Label htmlFor='show-countries'>Show countries</Label>
				</div>
				<div className='flex items-center gap-1.5 whitespace-nowrap'>
					<Checkbox
						id='show-groups'
						checked={showGroups}
						onCheckedChange={(checked) => setShowGroups(checked === 'indeterminate' ? false : checked)}
					/>
					<Label htmlFor='show-groups'>Show groups</Label>
				</div>
			</div>
			<SearchResults searchResults={searchResults} showType={showCountries && showGroups} />
		</div>
	);
};

export default CountriesAnalysisPage;
