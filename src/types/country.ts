import { Currency } from './currency';

export type Country = {
	cca3: string;
	name: string;
	full_name: string;
	cca2: string;
	ccn3: string;
	cioc: string;
	capital: string;
};

export type CountryGroup = {
	id: string;
	name: string;
	description: string;
	core: boolean;
	countries: string[];
};

export type CountryWithCurrencies = Country & {
	currencies: Currency[];
};
