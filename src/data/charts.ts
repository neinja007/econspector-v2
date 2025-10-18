import { ChartType } from '@/types/chart';
import { AreaChart, BarChart, LineChart } from 'recharts';

export const chartComponents = {
	[ChartType.AREA]: AreaChart,
	[ChartType.LINE]: LineChart,
	[ChartType.BAR]: BarChart
};
