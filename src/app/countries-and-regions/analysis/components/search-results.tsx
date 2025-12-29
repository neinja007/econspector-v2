import Flag from '@/components/flag';
import Link from 'next/link';
import { CountryOrRegion } from '../types/search-results';
import { slug } from '@/utils/slug';
import { useCountryGroups } from '@/hooks/react-query/queries/use-country-groups';
import { cn } from '@/utils/shadcn/utils';
import { Star } from 'lucide-react';

type SearchResultsProps = {
	searchResults: CountryOrRegion[];
	showType: boolean;
};

export const SearchResults = ({ searchResults, showType }: SearchResultsProps) => {
	const { data: countryGroups } = useCountryGroups();
	const favouriteGroup = countryGroups?.find((group) => group.name === 'Favourites' && group.core);
	const favouriteCountries = favouriteGroup?.countries;

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
			{searchResults
				.sort((a, b) => {
					const aIndex = favouriteCountries?.includes(a.type === 'country' ? a.data.cca3 : a.data.code) ? 0 : 1;
					const bIndex = favouriteCountries?.includes(b.type === 'country' ? b.data.cca3 : b.data.code) ? 0 : 1;
					return aIndex - bIndex;
				})
				.map((element) => (
					<Link
						href={`/countries-and-regions/analysis/${element.type}/${
							element.type === 'country' ? element.data.cca3 : element.data.code
						}`}
						className={cn(
							'border rounded-md p-4 flex gap-4 justify-between transition-colors',
							favouriteCountries?.some((country) =>
								element.type === 'country' ? country === element.data.cca3 : country === element.data.code
							)
								? 'hover:bg-yellow-500/10 hover:border-yellow-500'
								: 'hover:bg-accent hover:border-accent-foreground'
						)}
						key={slug(element.type + '-' + (element.type === 'country' ? element.data.cca3 : element.data.code))}
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
							<span className='line-clamp-2 text-right flex items-center gap-2'>
								{element.data.name}{' '}
								{favouriteCountries?.some((country) =>
									element.type === 'country' ? country === element.data.cca3 : country === element.data.code
								) ? (
									<Star className='size-5 text-yellow-500' />
								) : null}
							</span>
							<span className='text-sm text-muted-foreground'>
								{showType && `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} | `}
								{element.type === 'country' ? element.data.cca3 : element.data.code}
							</span>
						</div>
					</Link>
				))}
		</div>
	);
};
