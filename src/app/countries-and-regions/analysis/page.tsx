'use client';

import { Checkbox } from '@/components/shadcn/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/shadcn/ui/input-group';
import { Label } from '@/components/shadcn/ui/label';
import useSearch from '@/hooks/use-search';
import { useCountries } from '@/hooks/react-query/queries/use-countries';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchResults } from './components/search-results';

const CountriesAnalysisPage = () => {
	const [search, setSearch] = useState('');
	const { data: countries } = useCountries();
	const searchResults = useSearch(countries?.data || [], search, [
		'country_code',
		'name',
		'full_name',
		'cca2',
		'ccn3',
		'cioc',
		'capital'
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
					<Checkbox id='show-countries' />
					<Label htmlFor='show-countries'>Show countries</Label>
				</div>
				<div className='flex items-center gap-1.5 whitespace-nowrap'>
					<Checkbox id='show-regions' />
					<Label htmlFor='show-regions'>Show regions</Label>
				</div>
			</div>
			<SearchResults searchResults={searchResults} />
		</div>
	);
};

export default CountriesAnalysisPage;
