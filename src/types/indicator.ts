export type IndicatorCategory = {
	id: string;
	name: string;
};

export type Indicator = {
	id: number;
	parent_id: number;
	name: string;
	data_updated_at: string;
	category_id: string;
	indicator_frequencies: IndicatorFrequency[];
};

export type Frequency = 'Annual' | 'Biannual' | 'Monthly' | 'Quarterly';

export type IndicatorFrequency = {
	id: number;
	indicator_id: number;
	frequency: Frequency;
	frequency_sources: FrequencySource[];
};

export type FrequencySource = {
	id: number;
	frequency_id: number;
	source: string;
	unit: string;
};
