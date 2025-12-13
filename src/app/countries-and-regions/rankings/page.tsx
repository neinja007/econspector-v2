'use client';

import { IndicatorSelection } from '@/components/indicator-selection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { useIndicators } from '@/hooks/react-query/queries/use-indicators';
import { useEffect, useState } from 'react';

const Page = () => {
	const [rankBy, setRankBy] = useState<'country' | 'region' | 'subregion'>('country');
	const [selectedIndicatorId, setSelectedIndicatorId] = useState<string>('');
	const { data: indicators } = useIndicators();

	const selectedIndicator = indicators?.find((indicator) => indicator.id.toString() === selectedIndicatorId);

	const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

	useEffect(() => {
		if (selectedIndicator) {
			setSelectedChildId(selectedIndicator.children[0]?.id ?? null);
		}
	}, [selectedIndicator]);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<IndicatorSelection
						selectedIndicatorId={selectedIndicatorId}
						setSelectedIndicatorId={setSelectedIndicatorId}
					/>
					{selectedIndicator && selectedIndicator.children.length > 0 && (
						<Select
							value={selectedChildId?.toString() ?? undefined}
							onValueChange={(value) => setSelectedChildId(Number(value))}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select' />
							</SelectTrigger>
							<SelectContent>
								{selectedIndicator.children.map((child) => (
									<SelectItem key={child.id} value={child.id.toString()}>
										{child.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				</div>

				<div className='flex items-center gap-2'>
					Rank by
					<Select value={rankBy} onValueChange={(value) => setRankBy(value as 'country' | 'region' | 'subregion')}>
						<SelectTrigger>
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
