import { Chart } from '@/components/chart';
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

type IndicatorDialogProps = {
	children: React.ReactNode;
	indicator: Indicator;
	areaCode: string;
	areaName: string;
	timeSeriesData: TimeSeriesData | undefined;
	selectedChild: Indicator | null;
	hasChildren: boolean;
	selectedFrequency: IndicatorFrequency;
	selectedSource: FrequencySource;
	setSelectedChildId: (childId: number) => void;
	setSelectedFrequencyId: (frequencyId: number) => void;
	setSelectedSourceId: (sourceId: number) => void;
	selectedTimePeriod: [number, number] | null;
	setSelectedTimePeriod: (timePeriod: [number, number]) => void;
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
	areaName
}: IndicatorDialogProps) => {
	const selectedIndicator = hasChildren ? selectedChild ?? indicator : indicator;
	const availableFrequencies = selectedIndicator.indicator_frequencies;

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent fatDialog>
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
								disabled={!selectedFrequency.frequency_sources || selectedFrequency.frequency_sources.length <= 1}
								value={selectedSource.id.toString()}
								onValueChange={(value) => setSelectedSourceId(Number(value))}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{selectedFrequency.frequency_sources.map((source) => (
										<SelectItem key={source.id} value={source.id.toString()}>
											{DataSourceMap[source.data_source]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					</DialogTitle>
					<DialogDescription>
						{indicator.description ? indicator.description : 'There is no description associated with this indicator.'}
					</DialogDescription>
				</DialogHeader>
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
			</DialogContent>
		</Dialog>
	);
};
