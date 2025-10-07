import fs from 'fs';

const raw = fs.readFileSync('private/raw-data/general/countries/countries.json', 'utf-8');
const rawDbCountries = fs.readFileSync('private/raw-data/general/countries/db/countries.json', 'utf-8');
const rawCurrencies = fs.readFileSync('private/raw-data/general/currencies/currencies.json', 'utf-8');
const rawDbCurrencies = fs.readFileSync('private/raw-data/general/currencies/db/currencies.json', 'utf-8');
const countries = JSON.parse(raw);
const dbCountries = JSON.parse(rawDbCountries);
const currencies = JSON.parse(rawCurrencies);
const dbCurrencies = JSON.parse(rawDbCurrencies);

const rows = [];

/**
 * To run this file in the terminal, use:
 *
 *   node private/scripts/get_countries_currencies_csv.js
 *
 * Make sure you are in the project root directory and have Node.js installed.
 */

for (const country of dbCountries) {
	const nonDbCountryData = countries.find((co) => co.cca3 === country.cca3);
	if (!nonDbCountryData) {
		console.log(`Country ${country.cca3} not found in non-db countries.json`);
		continue;
	}
	const countryCurrencyData = nonDbCountryData.currencies;
	for (const currencyCode of Object.keys(countryCurrencyData)) {
		if (dbCurrencies.find((c) => c.currency_code === currencyCode)) {
			rows.push({
				country_code: country.cca3,
				currency_code: currencyCode
			});
		} else {
			console.log(`Currency ${currencyCode} not found in db currencies.json`);
		}
	}
}

const csv = 'country_code,currency_code\n' + rows.map((row) => `${row.cca3},${row.currency_code}`).join('\n');

fs.writeFileSync('private/scripts/output/countries_currencies.csv', csv);

console.log('✅ countries_currencies.csv generated successfully!');
