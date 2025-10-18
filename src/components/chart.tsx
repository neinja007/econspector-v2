import { ChartType } from '@/types/chart';
import { ChartConfig, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from './shadcn/ui/chart';
import { XAxis, YAxis } from 'recharts';
import { chartComponents } from '@/data/charts';

type ChartProps = {
	data: { period: string; values: Record<string, number> }[];
	type: ChartType;
	unit: string;
	config: ChartConfig;
};

export const Chart = ({ data, type, unit, config }: ChartProps) => {
	const chartData = data.map((item) => ({
		period: item.period,
		...item.values
	}));

	const ChartComponent = chartComponents[type];

	return (
		<ChartContainer config={config} className='h-[200px] w-full'>
			<ChartComponent data={chartData}>
				<XAxis dataKey='period' />
				<YAxis dataKey={unit} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend />
			</ChartComponent>
		</ChartContainer>
	);
};
