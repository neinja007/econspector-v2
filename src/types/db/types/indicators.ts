import { DbDataEnums } from '../alias';

export type Indicator = {
	id: number;
	code: string;
	name: string;
	unit: string;
	description: string;
	chart_type: string;
	children: Indicator[];
	indicator_frequencies: IndicatorFrequency[];
};

type IndicatorFrequency = {
	id: number;
	frequency: DbDataEnums<'frequency'>;
	frequency_sources: FrequencySource[];
};

type FrequencySource = {
	id: number;
	origin: DbDataEnums<'origin'>;
	data_source: DataSource;
};

type DataSource = {
	abbreviation: string;
	icon_path: string | null;
	name: string;
	website: string;
};
