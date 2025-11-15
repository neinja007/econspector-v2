import { DataSourceEnum } from '@/types/data_source';
import { FrequencyEnum } from '@/types/frequency';

export type Source = {
	source: DataSourceEnum;
	unit: string;
	worldBankIndicatorCode: string;
};

export type Frequency = {
	frequency: FrequencyEnum;
	sources: Source[];
};

export type Subindicator = {
	name: string;
	frequencies: Frequency[];
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
				frequencies: [
					{
						frequency: FrequencyEnum.ANNUAL,
						sources: [
							{
								source: DataSourceEnum.WORLD_BANK,
								unit: '%',
								worldBankIndicatorCode: 'NY.GDP.MKTP.KD.ZG'
							}
						]
					}
				]
			},
			{
				name: 'constant 2015 US$',
				frequencies: [
					{
						frequency: FrequencyEnum.ANNUAL,
						sources: [
							{
								source: DataSourceEnum.WORLD_BANK,
								unit: 'USD',
								worldBankIndicatorCode: 'NY.GDP.MKTP.KD'
							}
						]
					}
				]
			},
			{
				name: 'constant LCU',
				frequencies: [
					{
						frequency: FrequencyEnum.ANNUAL,
						sources: [
							{
								source: DataSourceEnum.WORLD_BANK,
								unit: 'LCU',
								worldBankIndicatorCode: 'NY.GDP.MKTP.KN'
							}
						]
					}
				]
			},
			{
				name: 'current US$',
				frequencies: [
					{
						frequency: FrequencyEnum.ANNUAL,
						sources: [
							{
								source: DataSourceEnum.WORLD_BANK,
								unit: 'USD',
								worldBankIndicatorCode: 'NY.GDP.MKTP.CD'
							}
						]
					}
				]
			},
			{
				name: 'current LCU',
				frequencies: [
					{
						frequency: FrequencyEnum.ANNUAL,
						sources: [
							{
								source: DataSourceEnum.WORLD_BANK,
								unit: 'LCU',
								worldBankIndicatorCode: 'NY.GDP.MKTP.CN'
							}
						]
					}
				]
			}
		]
	}
];
