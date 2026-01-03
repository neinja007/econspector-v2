export enum DataSource {
	WORLD_BANK = 'WORLD_BANK',
	UN_DATA = 'UN_DATA',
	IMF = 'IMF',
	TRADING_ECONOMICS = 'TRADING_ECONOMICS',
	OECD = 'OECD'
}

export const DataSourceMap = {
	[DataSource.WORLD_BANK]: 'World Bank',
	[DataSource.UN_DATA]: 'United Nations Data',
	[DataSource.IMF]: 'International Monetary Fund',
	[DataSource.TRADING_ECONOMICS]: 'Trading Economics',
	[DataSource.OECD]: 'Organisation for Economic Co-operation and Development'
};

export const DataSourceAbbreviationMap = {
	[DataSource.WORLD_BANK]: 'WB',
	[DataSource.UN_DATA]: 'UN',
	[DataSource.IMF]: 'IMF',
	[DataSource.TRADING_ECONOMICS]: 'TE',
	[DataSource.OECD]: 'OECD'
};
