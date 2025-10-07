'use client';

import Flag from '@/components/flag';
import { useCountryOrRegion } from '@/hooks/react-query/queries/use-country-or-region';
import { useParams } from 'next/navigation';

const CountryAnalysisPage = () => {
	const { code } = useParams<{ code: string; type: 'country' | 'region' | 'subregion' }>();

	const { data: country } = useCountryOrRegion('country', code);

	return (
		<div>
			<div className='flex justify-between'>
				<Flag code={country?.cca2 || ''} ratio='4x3' height={72} />
				<div className='flex flex-col'>
					<h1 className='text-2xl font-bold'>{country?.name}</h1>
					<p className='text-sm text-gray-500'>{country?.full_name}</p>
				</div>
			</div>
		</div>
	);
};

export default CountryAnalysisPage;
