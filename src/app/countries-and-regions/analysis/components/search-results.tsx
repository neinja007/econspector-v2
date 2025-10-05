import Flag from '@/components/flag';
import Link from 'next/link';
import { CountryOrRegion } from '../types/search-results';
import { slug } from '@/utils/slug';

type SearchResultsProps = {
	searchResults: CountryOrRegion[];
};

export const SearchResults = ({ searchResults }: SearchResultsProps) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
			{searchResults.map((element) => (
				<Link
					href={`/countries-and-regions/analysis/${slug(element.data.name)}`}
					className='border rounded-md p-4 flex gap-4 justify-between hover:bg-accent hover:border-accent-foreground transition-colors'
					key={slug(element.type === 'country' ? element.data.country_code : element.data.code)}
				>
					{element.type === 'country' ? (
						<div className='shrink-0'>
							<Flag code={element.data.cca2} ratio='4x3' height={72} />
						</div>
					) : (
						<div className='w-24 h-18 bg-gray-500 rounded-md flex items-center justify-center shrink-0'>
							{element.data.code}
						</div>
					)}
					<div className='flex flex-col items-end justify-between'>
						<span className='line-clamp-2 text-right'>{element.data.name}</span>
						<span className='text-sm text-muted-foreground'>
							{element.type === 'country' ? element.data.country_code : element.data.code}
						</span>
					</div>
				</Link>
			))}
		</div>
	);
};
