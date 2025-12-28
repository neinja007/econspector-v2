import { AbbreviationText } from '@/components/abbreviation-text';
import { Chart } from '@/components/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/ui/select';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import { Spinner } from '@/components/shadcn/ui/spinner';
import { useTimeSeriesData } from '@/hooks/react-query/queries/use-time-series-data';
import { Indicator } from '@/types/indicator';
import { TriangleAlertIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type IndicatorCardProps = {
	indicator: Indicator;
	areaName: string;
	areaCode: string;
};

export const IndicatorCard = ({ indicator, areaName, areaCode }: IndicatorCardProps) => {
	const hasChildren = indicator.children.length > 0;
	const [selectedChildId, setSelectedChildId] = useState<number | null>(indicator.children[0]?.id ?? null);

	const selectedIndicator = hasChildren
		? indicator.children.find((child) => child.id === selectedChildId) ?? indicator
		: indicator;

	const availableFrequencies = hasChildren
		? indicator.children.find((child) => child.id === selectedChildId)?.indicator_frequencies
		: indicator.indicator_frequencies;

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

	const { data: timeSeriesData, status } = useTimeSeriesData(selectedSourceId ?? 0, areaCode);

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2 min-h-8'>
					<AbbreviationText text={indicator.name} />
					{hasChildren && (
						<Select
							value={selectedChildId?.toString() ?? undefined}
							onValueChange={(value) => setSelectedChildId(Number(value))}
						>
							<SelectTrigger className='w-fit' size='sm'>
								<AbbreviationText text={selectedIndicator?.name} cursorPointer={true} />
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
				</CardTitle>
			</CardHeader>
			<CardContent className='h-[200px]'>
				{status === 'success' ? (
					timeSeriesData?.length > 0 ? (
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
					) : (
						<div className='h-full w-full flex items-center justify-center gap-2'>
							<TriangleAlertIcon /> No data available.
						</div>
					)
				) : (
					<Skeleton className='h-full w-full flex items-center justify-center gap-2'>
						<Spinner /> Loading data...
					</Skeleton>
				)}
			</CardContent>
		</Card>
	);
};
