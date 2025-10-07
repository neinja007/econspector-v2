'use client';

import { Checkbox } from '@/components/shadcn/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/shadcn/ui/input-group';
import { Label } from '@/components/shadcn/ui/label';
import useSearch from '@/hooks/use-search';
import { useCountries } from '@/hooks/react-query/queries/use-countries';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchResults } from './components/search-results';
import { CountryOrRegion } from './types/search-results';
import { useRegions } from '@/hooks/react-query/queries/use-regions';
import { useSubregions } from '@/hooks/react-query/queries/use-subregions';

const CountriesAnalysisPage = () => {
	const [search, setSearch] = useState('');

	const [showCountries, setShowCountries] = useState(true);
	const [showRegions, setShowRegions] = useState(false);

	const { data: countries } = useCountries();
	const { data: regions } = useRegions();
	const { data: subregions } = useSubregions();

	const searchList: CountryOrRegion[] = [
		...(showCountries ? countries?.data.map((country) => ({ type: 'country' as const, data: country })) || [] : []),
		...(showRegions ? regions?.data.map((region) => ({ type: 'region' as const, data: region })) || [] : []),
		...(showRegions ? subregions?.data.map((subregion) => ({ type: 'subregion' as const, data: subregion })) || [] : [])
	];

	const searchResults = useSearch(searchList, search, [
		'data.country_code',
		'data.name',
		'data.full_name',
		'data.cca2',
		'data.ccn3',
		'data.cioc',
		'data.capital'
	]);

	return (
		<div>
			<div className='flex items-center gap-4'>
				<InputGroup className='shrink'>
					<InputGroupInput
						placeholder='Search for a country or region...'
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
						id='show-regions'
						checked={showRegions}
						onCheckedChange={(checked) => setShowRegions(checked === 'indeterminate' ? false : checked)}
					/>
					<Label htmlFor='show-regions'>Show regions</Label>
				</div>
			</div>
			<SearchResults searchResults={searchResults} showType={showCountries && showRegions} />
		</div>
	);
};

export default CountriesAnalysisPage;
