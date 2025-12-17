'use client';

import { DataTable } from '@/components/data-table';
import { IndicatorSelection } from '@/components/indicator-selection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { Slider } from '@/components/shadcn/ui/slider';
import { useIndicators } from '@/hooks/react-query/queries/use-indicators';
import { useRankings } from '@/hooks/react-query/queries/use-rankings';
import { useEffect, useState } from 'react';
import { columns } from './types/ranking-columns';

const Page = () => {
	const [rankBy, setRankBy] = useState<'country' | 'region' | 'subregion'>('country');
	const [selectedIndicatorId, setSelectedIndicatorId] = useState<string>('');
	const { data: indicators } = useIndicators();
	const [timePeriod, setTimePeriod] = useState<[number, number] | null>(null);

	const selectedIndicator = indicators?.find((indicator) => indicator.id.toString() === selectedIndicatorId);

	const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

	useEffect(() => {
		if (selectedIndicator) {
			setSelectedChildId(selectedIndicator.children[0]?.id ?? null);
		}
	}, [selectedIndicator]);

	const sourceId =
		selectedIndicator &&
		(selectedChildId
			? selectedIndicator?.children.find((child) => child.id === selectedChildId)?.indicator_frequencies?.[0]
					?.frequency_sources?.[0]?.id
			: selectedIndicator.indicator_frequencies?.[0]?.frequency_sources?.[0]?.id);

	const rankings = useRankings(sourceId ?? 0, timePeriod);

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
				<div>
					{/* Time period slider using shadcn/ui/slider */}
					{/* You need to install @radix-ui/react-slider if not present */}
					{/* And have the Slider component in your shadcn/ui directory */}
					<div className='flex flex-col items-end gap-1'>
						<div className='flex items-center gap-2 w-56'>
							<span>{timePeriod ? timePeriod[0] : 2000}</span>
							<Slider
								id='timeSlider'
								min={2000}
								max={2023}
								value={timePeriod ? [timePeriod[0], timePeriod[1]] : [2000, 2023]}
								onValueChange={([start, end]) => setTimePeriod([start, end])}
								step={1}
								className='flex-1'
							/>
							<span>{timePeriod ? timePeriod[1] : 2023}</span>
						</div>
					</div>
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
			<div className='flex flex-col gap-4'>
				<DataTable columns={columns} data={rankings.data ?? []} />
			</div>
		</div>
	);
};

export default Page;
