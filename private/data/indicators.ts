import { ChartType } from '@/types/chart';
import { DataSource } from '@/types/data_source';
import { Frequency } from '@/types/frequency';

export type Source = {
	source: DataSource;
	code: string;
};

export type IndicatorFrequency = {
	frequency: Frequency;
	sources: Source[];
};

export type Subindicator = {
	name: string;
	unit: string;
	chart_type?: ChartType;
	frequencies: IndicatorFrequency[];
};

export type Indicator =
	| {
			name: string;
			subindicators: Subindicator[];
	  }
	| Subindicator;

export const indicators: Indicator[] = [
	{
		name: 'GDP',
		subindicators: [
			{
				name: '% growth',
				unit: '%',
				chart_type: ChartType.BAR,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.MKTP.KD.ZG'
							}
						]
					}
				]
			},
			{
				name: 'constant 2015 US$',
				unit: 'USD',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.MKTP.KD'
							}
						]
					}
				]
			},
			{
				name: 'constant LCU',
				unit: 'LCU',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.MKTP.KN'
							}
						]
					}
				]
			},
			{
				name: 'current US$',
				unit: 'USD',
				chart_type: ChartType.LINE,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.MKTP.CD'
							}
						]
					}
				]
			},
			{
				name: 'current LCU',
				unit: 'LCU',
				chart_type: ChartType.LINE,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.MKTP.CN'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'GDP per capita',
		subindicators: [
			{
				name: '% growth',
				unit: '%',
				chart_type: ChartType.BAR,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.PCAP.KD.ZG'
							}
						]
					}
				]
			},
			{
				name: 'current US$',
				unit: 'USD',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.PCAP.CD'
							}
						]
					}
				]
			},
			{
				name: 'PPP (current international US$)',
				unit: 'USD',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.PCAP.PP.CD'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'Population',
		subindicators: [
			{
				name: 'Total',
				unit: 'people',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SP.POP.TOTL'
							}
						]
					}
				]
			},
			{
				name: 'Urban',
				unit: 'people',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SP.URB.TOTL'
							}
						]
					}
				]
			},
			{
				name: 'Rural',
				unit: 'people',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SP.RUR.TOTL'
							}
						]
					}
				]
			},
			{
				name: '% growth',
				unit: '%',
				chart_type: ChartType.BAR,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SP.POP.GROW'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'Inflation',
		subindicators: [
			{
				name: 'Consumer prices',
				unit: '%',
				chart_type: ChartType.BAR,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'FP.CPI.TOTL.ZG'
							}
						]
					}
				]
			},
			{
				name: 'GDP deflator',
				unit: '%',
				chart_type: ChartType.BAR,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'NY.GDP.DEFL.KD.ZG'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'Surface area',
		unit: 'km²',
		chart_type: ChartType.AREA,
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: DataSource.WORLD_BANK,
						code: 'AG.SRF.TOTL.K2'
					}
				]
			}
		]
	}
];
