import { Chart } from '@/components/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { useTimeSeriesData } from '@/hooks/react-query/queries/use-time-series-data';
import { FrequencyEnum } from '@/types/frequency';
import { FrequencySource, Indicator } from '@/types/indicator';
import { useState } from 'react';

type IndicatorDataProps = {
	indicator: Indicator;
	areaName: string;
	areaCode: string;
};

export const IndicatorData = ({ indicator, areaName, areaCode }: IndicatorDataProps) => {
	const hasChildren = indicator.children.length > 0;
	const [selectedChildId, setSelectedChildId] = useState<number | null>(indicator.children[0]?.id ?? null);

	const availableFrequencies = hasChildren
		? indicator.children.find((child) => child.id === selectedChildId)?.indicator_frequencies
		: indicator.indicator_frequencies;

	const [selectedFrequency, setSelectedFrequency] = useState<FrequencyEnum | null>(
		availableFrequencies?.[0]?.frequency ?? null
	);

	const availableSources = availableFrequencies?.find(
		(frequency) => frequency.frequency === selectedFrequency
	)?.frequency_sources;

	const [selectedSource, setSelectedSource] = useState<FrequencySource | null>(availableSources?.[0] ?? null);

	const { data: timeSeriesData } = useTimeSeriesData(selectedSource, areaCode);

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
						value={selectedFrequency?.toString() ?? undefined}
						onValueChange={(value) => setSelectedFrequency(value as FrequencyEnum)}
						disabled={(!selectedChildId && hasChildren) || availableFrequencies?.length === 1}
					>
						<SelectTrigger className='w-fit ml-auto' size='sm'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{availableFrequencies?.map((frequency) => (
								<SelectItem key={frequency.frequency} value={frequency.frequency}>
									{frequency.frequency}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Chart
					data={timeSeriesData?.map((data) => ({ period: data.period, values: { [areaCode]: data.value } })) ?? []}
					type={indicator.chart_type}
					unit={indicator.unit}
					config={{
						[areaCode]: {
							label: areaName
						}
					}}
				/>
			</CardContent>
		</Card>
	);
};
