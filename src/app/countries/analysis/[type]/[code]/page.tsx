'use client';

import { Spinner } from '@/components/shadcn/ui/spinner';
import { useParams } from 'next/navigation';
import { Info } from './components/info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs';
import { useIndicatorCategories } from '@/hooks/react-query/queries/use-indicator-categories';
import { InputGroupAddon, InputGroupInput } from '@/components/shadcn/ui/input-group';
import { InputGroup } from '@/components/shadcn/ui/input-group';
import { Search } from 'lucide-react';
import { Indicators } from './components/indicators';
import { useState } from 'react';
import { useCountryOrGroup } from '@/hooks/react-query/queries/use-country-or-group';

const CountryAnalysisPage = () => {
	const { code, type } = useParams<{ code: string; type: 'country' | 'group' }>();

	const { data, status } = useCountryOrGroup(type, code);
	const { data: indicatorCategories } = useIndicatorCategories();

	const [tab, setTab] = useState<string>('all');

	const [search, setSearch] = useState<string>('');

	if (status === 'pending') {
		return (
			<div className='flex items-center justify-center h-96 gap-2'>
				<Spinner />
				The {type} is being loaded...
			</div>
		);
	}

	// TODO Modify this horrendous error handling

	if (!data) {
		return (
			<div className='flex items-center justify-center h-96 gap-2'>
				<Spinner />
				The {type} {code} is not found.
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
				<Tabs className='gap-4' value={tab} onValueChange={setTab}>
					<div className='flex gap-4'>
						<TabsList>
							<TabsTrigger value='all'>All</TabsTrigger>
							{indicatorCategories?.map((category) => (
								<TabsTrigger key={category.id} value={category.name}>
									{category.name}
								</TabsTrigger>
							))}
						</TabsList>
						<InputGroup>
							<InputGroupInput
								placeholder={`Search ${tab ? tab.toLowerCase() : 'all'} indicators...`}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<InputGroupAddon>
								<Search />
							</InputGroupAddon>
							{search && <InputGroupAddon align='inline-end'>12 results</InputGroupAddon>}
						</InputGroup>
					</div>
					{indicatorCategories?.map((category) => (
						<TabsContent key={category.id} value={category.name}>
							<Indicators category={category} areaName={data.name} areaCode={code} />
						</TabsContent>
					))}
					<TabsContent value='all'>
						<Indicators category={null} areaName={data.name} areaCode={code} />
					</TabsContent>
				</Tabs>
			</div>
		);
	}
};

export default CountryAnalysisPage;
