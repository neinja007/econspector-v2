import Flag from '@/components/flag';
import { Country } from '@/types/country';
import Link from 'next/link';

type SearchResultsProps = {
	searchResults: Country[];
};

export const SearchResults = ({ searchResults }: SearchResultsProps) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
			{searchResults.map((country) => (
				<Link
					href={`/countries-and-regions/analysis/${country.country_code.toLowerCase()}`}
					className='border rounded-md p-4 flex gap-4 justify-between hover:bg-accent hover:border-accent-foreground transition-colors'
					key={country.country_code}
				>
					<div>
						<Flag code={country.cca2} ratio='4x3' height={70} />
					</div>
					<div className='flex flex-col items-end justify-between'>
						<span className='line-clamp-2 text-right'>{country.name}</span>
						<span className='text-sm text-muted-foreground'>{country.country_code}</span>
					</div>
				</Link>
			))}
		</div>
	);
};
