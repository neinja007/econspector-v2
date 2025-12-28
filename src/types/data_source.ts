export enum DataSource {
	WORLD_BANK = 'WORLD_BANK',
	UN_DATA = 'UNDATA',
	IMF = 'IMF',
	TRADING_ECONOMICS = 'TRADING_ECONOMICS',
	OECD = 'OECD'
}

export const DataSourceMap = {
	[DataSource.WORLD_BANK]: 'World Bank',
	[DataSource.UN_DATA]: 'UN Data',
	[DataSource.IMF]: 'IMF',
	[DataSource.TRADING_ECONOMICS]: 'Trading Economics',
	[DataSource.OECD]: 'OECD'
};
