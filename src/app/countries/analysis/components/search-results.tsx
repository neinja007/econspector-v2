import Flag from '@/components/flag';
import Link from 'next/link';
import { slug } from '@/utils/slug';
import { useCountryGroups } from '@/hooks/react-query/queries/use-country-groups';
import { cn } from '@/utils/shadcn/utils';
import { Star } from 'lucide-react';
import { CountryOrGroup } from '../types/search-results';

type SearchResultsProps = {
	searchResults: CountryOrGroup[];
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
					const aIndex = a.type === 'country' ? (favouriteCountries?.includes(a.data.cca3) ? 0 : 1) : 0;
					const bIndex = b.type === 'country' ? (favouriteCountries?.includes(b.data.cca3) ? 0 : 1) : 0;
					return aIndex - bIndex;
				})
				.map((element) => (
					<Link
						href={`/countries/analysis/${element.type}/${
							element.type === 'country' ? element.data.cca3 : element.data.id
						}`}
						className={cn(
							'border rounded-md p-4 flex gap-4 justify-between transition-colors',
							favouriteCountries?.some((country) =>
								element.type === 'country' ? country === element.data.cca3 : country === element.data.id
							)
								? 'hover:bg-yellow-500/10 hover:border-yellow-500'
								: 'hover:bg-accent hover:border-accent-foreground'
						)}
						key={slug(element.type + '-' + (element.type === 'country' ? element.data.cca3 : element.data.id))}
					>
						{element.type === 'country' ? (
							<div className='shrink-0'>
								<Flag code={element.data.cca2} ratio='4x3' height={72} />
							</div>
						) : (
							<div className='w-24 h-18 relative bg-gray-500 overflow-hidden rounded-md flex items-center text-center justify-center shrink-0'>
								<div className='h-full w-full grid grid-cols-3'>
									{element.data.countries.map((country, index) => (
										<div key={index} className='h-full w-full bg-red-500'>
											<Flag code={country.cca2} ratio='4x3' height={72} />
										</div>
									))}
								</div>
								<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{element.data.name}</div>
							</div>
						)}
						<div className='flex flex-col items-end justify-between'>
							<span className='line-clamp-2 text-right flex items-center gap-2'>
								{element.data.name}{' '}
								{favouriteCountries?.some((country) =>
									element.type === 'country' ? country === element.data.cca3 : country === element.data.id
								) ? (
									<Star className='size-5 text-yellow-500' />
								) : null}
							</span>
							<span className='text-sm text-muted-foreground'>
								{element.type === 'country' ? element.data.cca3 : element.data.countries.length + ' countries'}
							</span>
						</div>
					</Link>
				))}
		</div>
	);
};
