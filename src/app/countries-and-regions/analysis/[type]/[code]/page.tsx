'use client';

import { useParams } from 'next/navigation';

const CountryAnalysisPage = () => {
	const { code } = useParams<{ code: string; type: 'country' | 'region' }>();
	return <div>{code}</div>;
};

export default CountryAnalysisPage;
