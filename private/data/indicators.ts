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
	},
	{
		name: 'Land area',
		unit: 'km²',
		chart_type: ChartType.AREA,
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: DataSource.WORLD_BANK,
						code: 'AG.LND.TOTL.K2'
					}
				]
			}
		]
	},
	{
		name: 'Forest area',
		subindicators: [
			{
				name: 'Total',
				unit: 'km²',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'AG.LND.FRST.K2'
							}
						]
					}
				]
			},
			{
				name: '% of land area',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'AG.LND.FRST.ZS'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'Income Distribution',
		subindicators: [
			{
				name: 'Gini index',
				unit: '%',
				chart_type: ChartType.LINE,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SI.POV.GINI'
							}
						]
					}
				]
			},
			{
				name: 'lowest 20%',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SI.DST.FRST.20'
							}
						]
					}
				]
			},
			{
				name: 'lowest 10%',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SI.DST.FRST.10'
							}
						]
					}
				]
			},
			{
				name: 'second 20%',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SI.DST.02ND.20'
							}
						]
					}
				]
			},
			{
				name: 'third 20%',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SI.DST.03RD.20'
							}
						]
					}
				]
			},
			{
				name: 'fourth 20%',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SI.DST.04TH.20'
							}
						]
					}
				]
			},
			{
				name: 'highest 20%',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SI.DST.05TH.20'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'Unemployment',
		subindicators: [
			{
				name: 'Total',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SL.UEM.TOTL.ZS'
							}
						]
					}
				]
			},
			{
				name: 'Male',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SL.UEM.TOTL.MA.ZS'
							}
						]
					}
				]
			},
			{
				name: 'Female',
				unit: '%',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SL.UEM.TOTL.FE.ZS'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'Birth rate, crude',
		unit: 'per 1000',
		chart_type: ChartType.AREA,
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: DataSource.WORLD_BANK,
						code: 'SP.DYN.CBRT.IN'
					}
				]
			}
		]
	},
	{
		name: 'Life expectancy',
		subindicators: [
			{
				name: 'Total',
				unit: 'years',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SP.DYN.LE00.IN'
							}
						]
					}
				]
			},
			{
				name: 'Male',
				unit: 'years',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SP.DYN.LE00.MA.IN'
							}
						]
					}
				]
			},
			{
				name: 'Female',
				unit: 'years',
				chart_type: ChartType.AREA,
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
								code: 'SP.DYN.LE00.FE.IN'
							}
						]
					}
				]
			}
		]
	},
	{
		name: 'Women who believe a husband is justified in beating his wife when she burns the food',
		unit: '%',
		chart_type: ChartType.AREA,
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: DataSource.WORLD_BANK,
						code: 'SG.VAW.BURN.ZS'
					}
				]
			}
		]
	}
];
