import { Chart } from '@/components/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { useTimeSeriesData } from '@/hooks/react-query/queries/use-time-series-data';
import { FrequencyEnum } from '@/types/frequency';
import { Indicator } from '@/types/indicator';
import { useEffect, useState } from 'react';

type IndicatorDataProps = {
	indicator: Indicator;
	areaName: string;
	areaCode: string;
};

export const IndicatorData = ({ indicator, areaName, areaCode }: IndicatorDataProps) => {
	const hasChildren = indicator.children.length > 0;
	const [selectedChildId, setSelectedChildId] = useState<number | null>(indicator.children[0]?.id ?? null);

	const selectedIndicator = hasChildren
		? indicator.children.find((child) => child.id === selectedChildId) ?? indicator
		: indicator;

	const availableFrequencies = hasChildren
		? indicator.children.find((child) => child.id === selectedChildId)?.indicator_frequencies
		: indicator.indicator_frequencies;

	console.log(availableFrequencies);

	const [selectedFrequencyId, setSelectedFrequencyId] = useState<number | null>(availableFrequencies?.[0]?.id ?? null);

	useEffect(() => {
		if (availableFrequencies) {
			setSelectedFrequencyId(availableFrequencies[0].id);
		}
	}, [availableFrequencies]);

	const availableSources = availableFrequencies?.find(
		(frequency) => frequency.id === selectedFrequencyId
	)?.frequency_sources;

	const [selectedSourceId, setSelectedSourceId] = useState<number | null>(availableSources?.[0]?.id ?? null);

	useEffect(() => {
		if (availableSources) {
			setSelectedSourceId(availableSources[0].id);
		}
	}, [availableSources]);

	const { data: timeSeriesData } = useTimeSeriesData(selectedSourceId ?? 0, areaCode);

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					{indicator.name}{' '}
					{hasChildren && (
						<Select
							value={selectedChildId?.toString() ?? undefined}
							onValueChange={(value) => setSelectedChildId(Number(value))}
						>
							<SelectTrigger className='w-fit' size='sm'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{indicator.children.map((child) => (
									<SelectItem key={child.id} value={child.id.toString()}>
										{child.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
					<Select
						value={selectedFrequencyId?.toString() ?? undefined}
						onValueChange={(value) => setSelectedFrequencyId(parseInt(value))}
						disabled={(!selectedChildId && hasChildren) || availableFrequencies?.length === 1}
					>
						<SelectTrigger className='w-fit ml-auto' size='sm'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{availableFrequencies?.map((frequency) => (
								<SelectItem key={frequency.id} value={frequency.id.toString()}>
									{FrequencyEnum[frequency.frequency]}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Chart
					data={timeSeriesData?.map((data) => ({ period: data.period, values: { [areaCode]: data.value } })) ?? []}
					type={selectedIndicator.chart_type}
					unit={selectedIndicator.unit}
					config={{
						[areaCode]: {
							label: areaName,
							color: '#ff0000'
						}
					}}
				/>
			</CardContent>
		</Card>
	);
};
