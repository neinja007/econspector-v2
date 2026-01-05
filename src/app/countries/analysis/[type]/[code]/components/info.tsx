import Flag from '@/components/flag';
import { Codes } from './codes';
import { Currencies } from './currencies';
import { useCountryGroups } from '@/hooks/react-query/queries/use-country-groups';
import { Button } from '@/components/shadcn/ui/button';
import { Star } from 'lucide-react';
import { Spinner } from '@/components/shadcn/ui/spinner';
import { useAddCountryToGroup } from '@/hooks/react-query/mutations/add-country-to-group';
import { useRemoveCountryFromGroup } from '@/hooks/react-query/mutations/remove-country-from-group';
import { DbDataViews } from '@/types/db/alias';
import { CountryGroup } from '@/types/db/types/country-group';

type InfoProps = { data: DbDataViews<'countries_with_currencies'> | CountryGroup };

export const Info = ({ data }: InfoProps) => {
	const { mutate: addCountryToGroup, isPending: isAddingCountryToGroup } = useAddCountryToGroup();
	const { mutate: removeCountryFromGroup, isPending: isRemovingCountryFromGroup } = useRemoveCountryFromGroup();
	const { data: countryGroups } = useCountryGroups();

	const favouriteGroup = countryGroups?.find((group) => group.name === 'Favourites' && group.core);

	return (
		<div className='flex gap-4 justify-between w-full'>
			<div className='flex items-center gap-6'>
				{'cca3' in data && <Flag code={data.cca3 || ''} ratio='4x3' width={200} />}
				<div className='flex flex-col gap-3 justify-between'>
					<div className='flex flex-col gap-1.5'>
						<h1 className='text-2xl font-bold'>
							{'full_name' in data && data.full_name !== data.name ? `${data.full_name} (${data.name})` : data.name}
						</h1>
						<span className='text-sm text-gray-500'>
							<Codes keys={['cca2', 'ccn3', 'cioc', 'cca3']} data={data} />
						</span>
						{'capital' in data && data.capital && (
							<span className='text-sm text-gray-500'>Capital: {data.capital}</span>
						)}
					</div>
					{'currencies' in data && <Currencies data={data.currencies} />}
				</div>
			</div>
			{'cca3' in data && favouriteGroup && (
				<div>
					{favouriteGroup.countries.includes(data.cca3!) ? (
						<Button
							variant='outline'
							onClick={() => removeCountryFromGroup({ countryCode: data.cca3!, groupId: favouriteGroup.id })}
							disabled={isRemovingCountryFromGroup}
						>
							{isRemovingCountryFromGroup ? <Spinner /> : <Star className='size-5' />} Remove from favourites
						</Button>
					) : (
						<Button
							variant='default'
							onClick={() => addCountryToGroup({ countryCode: data.cca3!, groupId: favouriteGroup.id })}
							disabled={isAddingCountryToGroup}
						>
							{isAddingCountryToGroup ? <Spinner /> : <Star className='size-5' />} Add to favourites
						</Button>
					)}
				</div>
			)}
		</div>
	);
};
