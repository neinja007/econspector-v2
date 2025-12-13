'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { useIndicators } from '@/hooks/react-query/queries/use-indicators';
import { useState } from 'react';

const Page = () => {
	const [rankBy, setRankBy] = useState<'country' | 'region' | 'subregion'>('country');
	const { data: indicators } = useIndicators();
	console.log(indicators);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<div>Select an indicator</div>
				<div className='flex items-center gap-2'>
					Rank by
					<Select value={rankBy} onValueChange={(value) => setRankBy(value as 'country' | 'region' | 'subregion')}>
						<SelectTrigger size='sm'>
							<SelectValue placeholder='Select' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='country'>Countries</SelectItem>
							<SelectItem value='region'>Regions</SelectItem>
							<SelectItem value='subregion'>Subregions</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default Page;
