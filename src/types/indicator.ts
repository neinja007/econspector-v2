import { ChartType } from './chart';
import { DataSourceEnum } from './data_source';
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
	chart_type: ChartType | null;
	data_updated_at: string;
	category_id: string;
	indicator_frequencies: IndicatorFrequency[];
	children: Indicator[];
};

export type IndicatorFrequency = {
	id: number;
	indicator_id: number;
	frequency: keyof typeof FrequencyEnum;
	frequency_sources: FrequencySource[];
};

export type FrequencySource = {
	id: number;
	frequency_id: number;
	name: keyof typeof DataSourceEnum;
};
