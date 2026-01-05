import { DbDataEnums } from '../alias';

export class DataSource {
	abbreviation: string;
	icon_path: string | null;
	name: string;
	website: string;

	constructor(data: DataSource) {
		this.abbreviation = data.abbreviation;
		this.icon_path = data.icon_path;
		this.name = data.name;
		this.website = data.website;
	}
}

export class FrequencySource {
	id: number;
	origin: DbDataEnums<'origin'>;
	data_source: DataSource;

	constructor(data: FrequencySource) {
		this.id = data.id;
		this.origin = data.origin;
		this.data_source = new DataSource(data.data_source);
	}
}

export class IndicatorFrequency {
	id: number;
	frequency: DbDataEnums<'frequency'>;
	frequency_sources: FrequencySource[];

	constructor(data: IndicatorFrequency) {
		this.id = data.id;
		this.frequency = data.frequency;
		this.frequency_sources = (data.frequency_sources ?? []).map((fs) => new FrequencySource(fs));
	}

	getSource(id: number): FrequencySource | undefined {
		return this.frequency_sources.find((fs) => fs.id === id);
	}
}

export type IndicatorType = {
	id: number;
	code: string | null;
	name: string;
	unit: string | null;
	description: string | null;
	chart_type: DbDataEnums<'chart_type'> | null;
	children?: IndicatorType[];
	indicator_frequencies?: IndicatorFrequency[];
};

export class Indicator {
	id: number;
	code: string;
	name: string;
	unit: string | null;
	description: string | null;
	chart_type: DbDataEnums<'chart_type'>;
	children: Indicator[];
	indicator_frequencies: IndicatorFrequency[];

	constructor(data: IndicatorType) {
		this.id = data.id;
		this.code = data.code ?? '???';
		this.name = data.name;
		this.unit = data.unit;
		this.description = data.description;
		this.chart_type = data.chart_type ?? 'AREA';
		this.children = (data.children ?? []).map((child) => new Indicator(child));
		this.indicator_frequencies = (data.indicator_frequencies ?? []).map((freq) => new IndicatorFrequency(freq));
	}

	hasChildren(): boolean {
		return this.children?.length > 0;
	}

	getFrequency(id: number): IndicatorFrequency | undefined {
		return this.indicator_frequencies.find((freq) => freq.id === id);
	}

	getChild(id: number): Indicator | undefined {
		return this.children.find((child) => child.id === id);
	}
}
