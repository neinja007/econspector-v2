import fs from 'fs';

const raw = fs.readFileSync('private/raw-data/countries.json', 'utf-8');
const rawCurrencies = fs.readFileSync('private/raw-data/currencies.json', 'utf-8');
const countries = JSON.parse(raw);
const currencies = JSON.parse(rawCurrencies);

const rows = [];

for (const country of countries) {
	const countryCode = country.cca3;
	if (country.currencies) {
		for (const currencyCode of Object.keys(country.currencies)) {
			if (currencies[currencyCode]) {
				rows.push({
					country_code: countryCode,
					currency_code: currencyCode
				});
			} else {
				console.log(`Currency ${currencyCode} not found in currencies.json`);
			}
		}
	}
}

const csv = 'country_code,currency_code\n' + rows.map((row) => `${row.country_code},${row.currency_code}`).join('\n');

fs.writeFileSync('private/scripts/output/country_currencies.csv', csv);

console.log('✅ country_currencies.csv generated successfully!');
