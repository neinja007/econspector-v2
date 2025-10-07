import Flag from '@/components/flag';
import { Country } from '@/types/country';
import { Region } from '@/types/region';
import { Subregion } from '@/types/subregion';
import { Codes } from './codes';

type InfoProps = { data: Country | Region | Subregion };

export const Info = ({ data }: InfoProps) => {
	return (
		<div className='flex gap-4'>
			{'cca2' in data && <Flag code={data.cca2 || ''} ratio='4x3' height={150} />}
			<div className='flex flex-col justify-between'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-2xl font-bold'>
						{'full_name' in data && data.full_name !== data.name ? `${data.full_name} (${data.name})` : data.name}
					</h1>
					<span className='text-sm text-gray-500'>
						<Codes keys={['cca2', 'ccn3', 'cioc', 'country_code']} data={data} />
					</span>
					{'capital' in data && data.capital && <span className='text-sm text-gray-500'>Capital: {data.capital}</span>}
				</div>
			</div>
		</div>
	);
};
