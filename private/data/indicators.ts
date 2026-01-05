import { DbDataEnums } from '@/types/db/alias';
import { Frequency } from '@/types/db/types/frequency';

type DataSource = DbDataEnums<'data_source'>;
type ChartType = DbDataEnums<'chart_type'>;

type Source = {
	source: DataSource;
	code: string;
};

type IndicatorFrequency = {
	frequency: Frequency;
	sources: Source[];
};

type Subindicator = {
	name: string;
	abbreviation: string;
	unit: string;
	chart_type?: DbDataEnums<'chart_type'>;
	frequencies: IndicatorFrequency[];
};

type Indicator =
	| {
			name: string;
			abbreviation: string;
			subindicators: Subindicator[];
	  }
	| Subindicator;

export const indicators: Indicator[] = [
	{
		name: 'GDP',
		abbreviation: 'GDP',
		subindicators: [
			{
				name: '% growth',
				abbreviation: '%-GR',
				unit: '%',
				chart_type: 'BAR',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'NY.GDP.MKTP.KD.ZG'
							}
						]
					}
				]
			},
			{
				name: 'constant 2015 US$',
				abbreviation: 'CON-2015-USD',
				unit: 'USD',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'NY.GDP.MKTP.KD'
							}
						]
					}
				]
			},
			{
				name: 'constant LCU',
				abbreviation: 'CON-LCU',
				unit: 'LCU',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'NY.GDP.MKTP.KN'
							}
						]
					}
				]
			},
			{
				name: 'current US$',
				abbreviation: 'CUR-USD',
				unit: 'USD',
				chart_type: 'LINE',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'NY.GDP.MKTP.CD'
							}
						]
					}
				]
			},
			{
				name: 'current LCU',
				abbreviation: 'CUR-LCU',
				unit: 'LCU',
				chart_type: 'LINE',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'GDP-PC',
		subindicators: [
			{
				name: '% growth',
				abbreviation: '%-GR',
				unit: '%',
				chart_type: 'BAR',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'NY.GDP.PCAP.KD.ZG'
							}
						]
					}
				]
			},
			{
				name: 'current US$',
				abbreviation: 'CUR-USD',
				unit: 'USD',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'NY.GDP.PCAP.CD'
							}
						]
					}
				]
			},
			{
				name: 'PPP (current international US$)',
				abbreviation: 'PPP-CUR-USD',
				unit: 'USD',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'POP',
		subindicators: [
			{
				name: 'Total',
				abbreviation: 'TOT',
				unit: 'people',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SP.POP.TOTL'
							}
						]
					}
				]
			},
			{
				name: 'Urban',
				abbreviation: 'URB',
				unit: 'people',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SP.URB.TOTL'
							}
						]
					}
				]
			},
			{
				name: 'Rural',
				abbreviation: 'RUR',
				unit: 'people',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SP.RUR.TOTL'
							}
						]
					}
				]
			},
			{
				name: '% growth',
				abbreviation: '%-GR',
				unit: '%',
				chart_type: 'BAR',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'INF',
		subindicators: [
			{
				name: 'Consumer prices',
				abbreviation: 'CPI',
				unit: '%',
				chart_type: 'BAR',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'FP.CPI.TOTL.ZG'
							}
						]
					}
				]
			},
			{
				name: 'GDP deflator',
				abbreviation: 'GDP-DEF',
				unit: '%',
				chart_type: 'BAR',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'SUR',
		unit: 'km²',
		chart_type: 'AREA',
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: 'WORLD_BANK',
						code: 'AG.SRF.TOTL.K2'
					}
				]
			}
		]
	},
	{
		name: 'Land area',
		abbreviation: 'LAN',
		unit: 'km²',
		chart_type: 'AREA',
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: 'WORLD_BANK',
						code: 'AG.LND.TOTL.K2'
					}
				]
			}
		]
	},
	{
		name: 'Forest area',
		abbreviation: 'FOR',
		subindicators: [
			{
				name: 'Total',
				abbreviation: 'TOT',
				unit: 'km²',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'AG.LND.FRST.K2'
							}
						]
					}
				]
			},
			{
				name: '% of land area',
				abbreviation: '%-LAND',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'INC-DIST',
		subindicators: [
			{
				name: 'Gini index',
				abbreviation: 'GINI',
				unit: '%',
				chart_type: 'LINE',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SI.POV.GINI'
							}
						]
					}
				]
			},
			{
				name: 'lowest 20%',
				abbreviation: '1ST-20%',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SI.DST.FRST.20'
							}
						]
					}
				]
			},
			{
				name: 'lowest 10%',
				abbreviation: '1ST-10%',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SI.DST.FRST.10'
							}
						]
					}
				]
			},
			{
				name: 'second 20%',
				abbreviation: '2ND-20%',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SI.DST.02ND.20'
							}
						]
					}
				]
			},
			{
				name: 'third 20%',
				abbreviation: '3RD-20%',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SI.DST.03RD.20'
							}
						]
					}
				]
			},
			{
				name: 'fourth 20%',
				abbreviation: '4TH-20%',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SI.DST.04TH.20'
							}
						]
					}
				]
			},
			{
				name: 'highest 20%',
				abbreviation: '5TH-20%',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'UNEMP',
		subindicators: [
			{
				name: 'Total',
				abbreviation: 'TOT',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SL.UEM.TOTL.ZS'
							}
						]
					}
				]
			},
			{
				name: 'Male',
				abbreviation: 'MA',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SL.UEM.TOTL.MA.ZS'
							}
						]
					}
				]
			},
			{
				name: 'Female',
				abbreviation: 'FE',
				unit: '%',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'BR-CR',
		unit: 'per 1000',
		chart_type: 'AREA',
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: 'WORLD_BANK',
						code: 'SP.DYN.CBRT.IN'
					}
				]
			}
		]
	},
	{
		name: 'Life expectancy',
		abbreviation: 'LE',
		subindicators: [
			{
				name: 'Total',
				abbreviation: 'TOT',
				unit: 'years',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SP.DYN.LE00.IN'
							}
						]
					}
				]
			},
			{
				name: 'Male',
				abbreviation: 'MA',
				unit: 'years',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
								code: 'SP.DYN.LE00.MA.IN'
							}
						]
					}
				]
			},
			{
				name: 'Female',
				abbreviation: 'FE',
				unit: 'years',
				chart_type: 'AREA',
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: 'WORLD_BANK',
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
		abbreviation: 'VAW-BURN',
		unit: '%',
		chart_type: 'AREA',
		frequencies: [
			{
				frequency: Frequency.ANNUAL,
				sources: [
					{
						source: 'WORLD_BANK',
						code: 'SG.VAW.BURN.ZS'
					}
				]
			}
		]
	}
];
