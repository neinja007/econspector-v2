import { Chart } from '@/components/chart';
import { Card, CardContent } from '@/components/shadcn/ui/card';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import { Spinner } from '@/components/shadcn/ui/spinner';
import { useTimeSeriesData } from '@/hooks/react-query/queries/use-time-series-data';
import { Expand, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IndicatorCardHeader } from './indicator-card-header';
import { Button } from '@/components/shadcn/ui/button';
import { IndicatorDialog } from './indicator-dialog';
import { Indicator } from '@/types/db/types/indicators';

type IndicatorCardProps = {
	indicator: Indicator;
	areaName: string;
	areaCode: string;
};

export const IndicatorCard = ({ indicator, areaName, areaCode }: IndicatorCardProps) => {
	const hasChildren = indicator.hasChildren();

	const [isExpanded, setIsExpanded] = useState(false);

	const [selectedChildId, setSelectedChildId] = useState<number | null>(indicator.getChild(0)?.id ?? null);

	const selectedIndicator = hasChildren ? indicator.getChild(selectedChildId ?? 0) ?? indicator : indicator;

	const availableFrequencies = selectedIndicator?.indicator_frequencies;

	const [selectedFrequencyId, setSelectedFrequencyId] = useState<number | null>(availableFrequencies?.[0]?.id ?? null);

	useEffect(() => {
		if (availableFrequencies) {
			setSelectedFrequencyId(availableFrequencies[0].id);
		}
	}, [availableFrequencies]);

	const availableSources = selectedIndicator?.getFrequency(selectedFrequencyId ?? 0)?.frequency_sources;

	const [selectedSourceId, setSelectedSourceId] = useState<number | null>(availableSources?.[0]?.id ?? null);

	useEffect(() => {
		if (availableSources) {
			setSelectedSourceId(availableSources[0].id);
		}
	}, [availableSources]);

	const [selectedTimePeriod, setSelectedTimePeriod] = useState<[number, number] | null>(null);

	const { data: timeSeriesData, status } = useTimeSeriesData(selectedSourceId ?? 0, areaCode);

	// useEffect(() => {
	// 	if (timeSeriesData) {
	// 		setSelectedTimePeriod([
	// 			Number(timeSeriesData[0].period),
	// 			Number(timeSeriesData[timeSeriesData.length - 1].period)
	// 		]);
	// 	}
	// }, [timeSeriesData]);

	const selectedChild = hasChildren ? indicator.children.find((child) => child.id === selectedChildId) ?? null : null;
	const selectedFrequency = availableFrequencies?.find((frequency) => frequency.id === selectedFrequencyId) ?? null;
	const selectedSource = availableSources?.find((source) => source.id === selectedSourceId) ?? null;

	return (
		<Card>
			<IndicatorCardHeader
				indicator={indicator}
				hasChildren={hasChildren}
				selectedChild={selectedChild}
				setSelectedChildId={setSelectedChildId}
				selectedIndicator={selectedIndicator}
			>
				{
					<IndicatorDialog
						indicator={indicator}
						areaCode={areaCode}
						areaName={areaName}
						timeSeriesData={timeSeriesData}
						selectedChild={selectedIndicator}
						hasChildren={hasChildren}
						selectedFrequency={selectedFrequency}
						selectedSource={selectedSource}
						setSelectedChildId={setSelectedChildId}
						setSelectedFrequencyId={setSelectedFrequencyId}
						setSelectedSourceId={setSelectedSourceId}
						selectedTimePeriod={selectedTimePeriod}
						setSelectedTimePeriod={setSelectedTimePeriod}
						setIsExpanded={setIsExpanded}
						isExpanded={isExpanded}
					>
						<Button size='icon-sm' className='ml-auto' variant='ghost' onClick={() => setIsExpanded(!isExpanded)}>
							<Expand />
						</Button>
					</IndicatorDialog>
				}
			</IndicatorCardHeader>
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
