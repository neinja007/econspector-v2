import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shadcn/ui/dialog';
import { TimeSeriesData } from '@/types/data';
import { Indicator } from '@/types/indicator';

type IndicatorDialogProps = {
	children: React.ReactNode;
	indicator: Indicator;
	timeSeriesData: TimeSeriesData;
	selectedChildId: number;
	selectedFrequencyId: number;
	selectedSourceId: number;
	setSelectedChildId: (childId: number) => void;
	setSelectedFrequencyId: (frequencyId: number) => void;
	setSelectedSourceId: (sourceId: number) => void;
	selectedTimePeriod: [number, number];
	setSelectedTimePeriod: (timePeriod: [number, number]) => void;
};

export const IndicatorDialog = ({ children, indicator, timeSeriesData }: IndicatorDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{indicator.name}</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
