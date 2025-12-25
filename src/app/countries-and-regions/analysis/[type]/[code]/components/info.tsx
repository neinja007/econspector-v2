import Flag from '@/components/flag';
import { CountryWithCurrencies } from '@/types/country';
import { Region } from '@/types/region';
import { Subregion } from '@/types/subregion';
import { Codes } from './codes';
import { Currencies } from './currencies';
import { useFavouriteCountries } from '@/hooks/react-query/queries/use-favourite-countries';
import { Button } from '@/components/shadcn/ui/button';
import { Star } from 'lucide-react';
import { Spinner } from '@/components/shadcn/ui/spinner';
import { useToggleFavouriteCountry } from '@/hooks/react-query/mutations/use-toggle-favourite-country';

type InfoProps = { data: Region | Subregion | CountryWithCurrencies };

export const Info = ({ data }: InfoProps) => {
	const { mutate: toggleFavouriteCountry, isPending: isTogglingFavouriteCountry } = useToggleFavouriteCountry();
	const { data: favouriteCountries } = useFavouriteCountries();

	return (
		<div className='flex gap-4 justify-between w-full'>
			<div className='flex items-center gap-6'>
				{'cca2' in data && <Flag code={data.cca2 || ''} ratio='4x3' height={150} />}
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
			{'cca3' in data && (
				<div>
					{favouriteCountries?.some((country) => country === data.cca3) ? (
						<Button
							variant='outline'
							onClick={() => toggleFavouriteCountry({ countryCode: data.cca3, action: 'remove' })}
							disabled={isTogglingFavouriteCountry}
						>
							{isTogglingFavouriteCountry ? <Spinner /> : <Star className='size-5' />} Remove from favourites
						</Button>
					) : (
						<Button
							variant='default'
							onClick={() => toggleFavouriteCountry({ countryCode: data.cca3, action: 'add' })}
							disabled={isTogglingFavouriteCountry}
						>
							{isTogglingFavouriteCountry ? <Spinner /> : <Star className='size-5' />} Add to favourites
						</Button>
					)}
				</div>
			)}
		</div>
	);
};
