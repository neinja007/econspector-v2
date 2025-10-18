import { ChartType } from './chart';
import { FrequencyEnum } from './frequency';

export type IndicatorCategory = {
	id: string;
	name: string;
};

export type Indicator = {
	id: number;
	parent_id: number;
	name: string;
	unit: string;
	chart_type: ChartType;
	data_updated_at: string;
	category_id: string;
	indicator_frequencies: IndicatorFrequency[];
	children: Indicator[];
};

export type IndicatorFrequency = {
	id: number;
	indicator_id: number;
	frequency: FrequencyEnum;
	frequency_sources: FrequencySource[];
};

export type FrequencySource = {
	id: number;
	frequency_id: number;
	name: string;
};
