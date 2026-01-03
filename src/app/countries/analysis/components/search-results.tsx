import Flag from '@/components/flag';
import Link from 'next/link';
import { slug } from '@/utils/slug';
import { useCountryGroups } from '@/hooks/react-query/queries/use-country-groups';
import { cn } from '@/utils/shadcn/utils';
import { CountryOrGroup } from '../types/search-results';
import GroupFlags from '@/components/group-flags';
import { Star } from 'lucide-react';

type SearchResultsProps = {
	searchResults: CountryOrGroup[];
	showType: boolean;
};

export const SearchResults = ({ searchResults, showType }: SearchResultsProps) => {
	const { data: countryGroups } = useCountryGroups();
	const favouriteGroup = countryGroups?.find((group) => group.name === 'Favourites' && group.core);
	const favouriteCountries = favouriteGroup?.countries;

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-8'>
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
						className={cn('rounded-md group transition-colors')}
						key={slug(element.type + '-' + (element.type === 'country' ? element.data.cca3 : element.data.id))}
					>
						<div className='relative'>
							<div className='opacity-50 group-hover:opacity-100 aspect-4/3 transition-all rounded-md overflow-hidden'>
								{element.type === 'country' ? (
									<Flag code={element.data.cca3} ratio='4x3' />
								) : (
									<GroupFlags countries={element.data.countries} />
								)}
							</div>
							<div
								className={cn(
									'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-1 py-0.5 rounded-md font-medium group-hover:scale-125 group-hover:bg-black/40 transition-all flex items-center gap-1',
									element.type === 'country'
										? favouriteCountries?.some((country) => country === element.data.cca3)
											? 'text-yellow-400'
											: 'text-white'
										: undefined
								)}
							>
								{element.type === 'country' && favouriteCountries?.some((country) => country === element.data.cca3) && (
									<Star className='size-4 text-yellow-400' />
								)}
								{element.data.name}
							</div>
						</div>
					</Link>
				))}
		</div>
	);
};
