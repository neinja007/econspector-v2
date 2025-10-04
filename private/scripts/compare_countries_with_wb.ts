import { countries } from '../raw-data/general/countries/countries';
import { world_bank_countries } from '../raw-data/world_bank/countries';
import { world_bank_regions } from '../raw-data/world_bank/regions';

const countriesWithoutRegions = world_bank_countries.filter(
	(country) => !world_bank_regions.some((region) => region.code === country.id)
);

console.log(
	countries
		.filter((country) => !countriesWithoutRegions.some((wbCountry) => wbCountry.id === country.cca3))
		.map((country) => country.cca3)
);
