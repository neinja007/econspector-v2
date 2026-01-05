import { ChartConfig, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from './shadcn/ui/chart';
import {
	XAxis,
	YAxis,
	AreaChart as RechartsAreaChart,
	BarChart as RechartsBarChart,
	LineChart as RechartsLineChart,
	Area,
	Line,
	Bar
} from 'recharts';
import { useMemo } from 'react';
import { DbDataEnums } from '@/types/db/alias';

type ChartProps = {
	data: { period: string; values: Record<string, number> }[];
	type: DbDataEnums<'chart_type'> | null;
	unit: string;
	config: ChartConfig;
};

export const Chart = ({ data, type, unit, config }: ChartProps) => {
	const chartData = data.map((item) => ({
		period: item.period,
		...item.values
	}));

	const RechartsComponent = type === 'LINE' ? RechartsLineChart : type === 'BAR' ? RechartsBarChart : RechartsAreaChart;

	const chartKey = useMemo(() => {
		return Math.random().toString();
	}, [data]);

	return (
		<ChartContainer config={config} className='h-full w-full pr-2'>
			<RechartsComponent key={chartKey} data={chartData} accessibilityLayer>
				<XAxis dataKey='period' />
				<YAxis
					tickFormatter={(value) =>
						value.toLocaleString(undefined, {
							maximumFractionDigits: 1,
							notation: 'compact'
						})
					}
					width={40}
				/>
				<ChartTooltip content={<ChartTooltipContent compactNotation unit={unit} />} />
				{Object.keys(config).map((key) => {
					const color = config[key].color ?? '#ff0000';
					if (type === 'AREA') {
						return (
							<Area
								key={key}
								fill={config[key].color ?? '#ff0000'}
								stroke={config[key].color ?? '#ff0000'}
								fillOpacity={0.5}
								strokeWidth={2}
								dataKey={key}
							/>
						);
					} else if (type === 'LINE') {
						return <Line key={key} dataKey={key} stroke={color} strokeWidth={2} dot={false} />;
					} else {
						return <Bar key={key} dataKey={key} fill={color} />;
					}
				})}
				{Object.keys(config).length > 1 && <ChartLegend />}
			</RechartsComponent>
		</ChartContainer>
	);
};
