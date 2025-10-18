'use client';

import { Spinner } from '@/components/shadcn/ui/spinner';
import { useCountryOrRegion } from '@/hooks/react-query/queries/use-country-or-region';
import { useParams } from 'next/navigation';
import { Info } from './components/info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs';
import { useIndicatorCategories } from '@/hooks/react-query/queries/use-indicator-categories';
import { InputGroupAddon, InputGroupInput } from '@/components/shadcn/ui/input-group';
import { InputGroup } from '@/components/shadcn/ui/input-group';
import { Search } from 'lucide-react';
import { Indicators } from './components/indicators';

const CountryAnalysisPage = () => {
	const { code, type } = useParams<{ code: string; type: 'country' | 'region' | 'subregion' }>();

	const { data, status } = useCountryOrRegion(type, code);
	const { data: indicatorCategories } = useIndicatorCategories();

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
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between items-center'>
					<Info data={data} />
				</div>
				<hr />
				<Tabs>
					<div className='flex gap-2'>
						<TabsList>
							{indicatorCategories?.map((category) => (
								<TabsTrigger key={category.id} value={category.name}>
									{category.name}
								</TabsTrigger>
							))}
						</TabsList>
						<InputGroup>
							<InputGroupInput placeholder='Search indicators...' />
							<InputGroupAddon>
								<Search />
							</InputGroupAddon>
						</InputGroup>
					</div>
					{indicatorCategories?.map((category) => (
						<TabsContent key={category.id} value={category.name}>
							<Indicators category={category} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		);
	}
};

export default CountryAnalysisPage;
