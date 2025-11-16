import { DataSource } from '@/types/data_source';
import { Frequency } from '@/types/frequency';

export type Source = {
	source: DataSource;
	unit: string;
	worldBankIndicatorCode: string;
};

export type IndicatorFrequency = {
	frequency: Frequency;
	sources: Source[];
};

export type Subindicator = {
	name: string;
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
				frequencies: [
					{
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
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
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
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
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
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
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
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
						frequency: Frequency.ANNUAL,
						sources: [
							{
								source: DataSource.WORLD_BANK,
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
