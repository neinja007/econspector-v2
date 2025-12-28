import { Chart } from '@/components/chart';
import { Button } from '@/components/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/shadcn/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { TimeSeriesData } from '@/types/data';
import { DataSourceMap } from '@/types/data_source';
import { FrequencyMap } from '@/types/frequency';
import { FrequencySource, Indicator, IndicatorFrequency } from '@/types/indicator';
import { X } from 'lucide-react';

type IndicatorDialogProps = {
	children: React.ReactNode;
	indicator: Indicator;
	areaCode: string;
	areaName: string;
	timeSeriesData: TimeSeriesData | undefined;
	selectedChild: Indicator | null;
	hasChildren: boolean;
	selectedFrequency: IndicatorFrequency | null;
	selectedSource: FrequencySource | null;
	setSelectedChildId: (childId: number) => void;
	setSelectedFrequencyId: (frequencyId: number) => void;
	setSelectedSourceId: (sourceId: number) => void;
	selectedTimePeriod: [number, number] | null;
	setSelectedTimePeriod: (timePeriod: [number, number]) => void;
	isExpanded: boolean;
	setIsExpanded: (expanded: boolean) => void;
};

export const IndicatorDialog = ({
	children,
	indicator,
	timeSeriesData,
	selectedChild,
	hasChildren,
	selectedFrequency,
	selectedSource,
	setSelectedChildId,
	setSelectedFrequencyId,
	setSelectedSourceId,
	selectedTimePeriod,
	setSelectedTimePeriod,
	setIsExpanded,
	areaCode,
	areaName,
	isExpanded
}: IndicatorDialogProps) => {
	const selectedIndicator = hasChildren ? selectedChild ?? indicator : indicator;
	const availableFrequencies = selectedIndicator.indicator_frequencies;

	return (
		<Dialog open={isExpanded} onOpenChange={setIsExpanded}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent fatDialog showCloseButton={false}>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						{indicator.name}
						{hasChildren && selectedChild && (
							<Select value={selectedChild.id.toString()} onValueChange={(value) => setSelectedChildId(Number(value))}>
								<SelectTrigger>
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
						{selectedFrequency && (
							<Select
								disabled={!availableFrequencies || availableFrequencies.length <= 1}
								value={selectedFrequency.id.toString()}
								onValueChange={(value) => setSelectedFrequencyId(Number(value))}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{availableFrequencies?.map((frequency) => (
										<SelectItem key={frequency.id} value={frequency.id.toString()}>
											{FrequencyMap[frequency.frequency]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						{selectedSource && (
							<Select
								disabled={!selectedFrequency?.frequency_sources || selectedFrequency?.frequency_sources.length <= 1}
								value={selectedSource.id.toString()}
								onValueChange={(value) => setSelectedSourceId(Number(value))}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{selectedFrequency?.frequency_sources.map((source) => (
										<SelectItem key={source.id} value={source.id.toString()}>
											{DataSourceMap[source.data_source]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						<Button size='icon-sm' className='ml-auto' variant='ghost' onClick={() => setIsExpanded(false)}>
							<X />
						</Button>
					</DialogTitle>
					<DialogDescription>
						{indicator.description ? indicator.description : 'There is no description associated with this indicator.'}
					</DialogDescription>
				</DialogHeader>
				<hr />
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
				<hr />
			</DialogContent>
		</Dialog>
	);
};
