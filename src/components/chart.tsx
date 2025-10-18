import { ChartType } from '@/types/chart';
import { ChartConfig, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from './shadcn/ui/chart';
import {
	XAxis,
	YAxis,
	AreaChart as RechartsAreaChart,
	BarChart as RechartsBarChart,
	LineChart as RechartsLineChart
} from 'recharts';

type ChartProps = {
	data: { period: string; values: Record<string, number> }[];
	type: ChartType | null;
	unit: string;
	config: ChartConfig;
};

export const Chart = ({ data, type, unit, config }: ChartProps) => {
	const chartData = data.map((item) => ({
		period: item.period,
		...item.values
	}));

	const RechartsComponent =
		type === ChartType.LINE ? RechartsLineChart : type === ChartType.BAR ? RechartsBarChart : RechartsAreaChart;

	return (
		<ChartContainer config={config} className='h-[200px] w-full'>
			<RechartsComponent data={chartData} accessibilityLayer>
				<XAxis dataKey='period' />
				<YAxis dataKey={unit} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend />
			</RechartsComponent>
		</ChartContainer>
	);
};
