import { ChartType } from './chart';
import { DataSource } from './data_source';
import { Frequency } from './frequency';

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
	description: string | null;
};

export type IndicatorFrequency = {
	id: number;
	indicator_id: number;
	frequency: keyof typeof Frequency;
	frequency_sources: FrequencySource[];
};

export type FrequencySource = {
	id: number;
	frequency_id: number;
	data_source: keyof typeof DataSource;
};
