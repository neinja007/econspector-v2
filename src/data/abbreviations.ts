export const abbreviations: Record<
	string,
	{
		short: string;
		long: string;
	}
> = {
	gdp: {
		short: 'Gross Domestic Product. Often used as a measure of economic output.',
		long: "Gross Domestic Product. Represents the total value of all goods and services produced within a country's borders."
	},
	lcu: {
		short: 'Local Currency Unit. Represents the value of goods and services in the local currency.',
		long: 'Local Currency Unit. Refers to the unit of currency used in a specific country or region. Data reported in LCU is expressed in terms of the actual currency in use, without any adjustment for exchange rates.'
	}
};
