'use client';

import { Spinner } from '@/components/shadcn/ui/spinner';
import { useCountryOrRegion } from '@/hooks/react-query/queries/use-country-or-region';
import { useParams } from 'next/navigation';
import { Info } from './components/info';

const CountryAnalysisPage = () => {
	const { code, type } = useParams<{ code: string; type: 'country' | 'region' | 'subregion' }>();

	const { data, status } = useCountryOrRegion(type, code);

	if (status === 'pending') {
		return (
			<div className='flex items-center justify-center h-96 gap-2'>
				<Spinner />
				The {type} is being loaded...
			</div>
		);
	}

	if (status === 'success') {
		return (
			<div>
				<Info data={data} />
			</div>
		);
	}
};

export default CountryAnalysisPage;
