export enum DatabaseSchema {
	DATA = 'data',
	USERS = 'users'
}

export enum DatabaseTable {
	INDICATORS = 'indicators',
	INDICATOR_FREQUENCIES = 'indicator_frequencies',
	FREQUENCY_SOURCES = 'frequency_sources',
	INDICATOR_CATEGORIES = 'indicator_categories',
	TIME_SERIES_DATA = 'time_series_data',
	COUNTRIES = 'countries',
	CURRENCIES = 'currencies',
	COUNTRIES_CURRENCIES = 'countries_currencies',
	REGIONS = 'regions',
	SUBREGIONS = 'subregions',

	COUNTRY_GROUPS = 'country_groups',
	COUNTRY_GROUPS_COUNTRIES = 'country_groups_countries',
	INDICATOR_GROUPS = 'indicator_groups',
	INDICATOR_GROUPS_INDICATORS = 'indicator_groups_indicators'
}
