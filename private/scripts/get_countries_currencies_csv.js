import fs from 'fs';

const raw = fs.readFileSync('./raw-data/countries.json', 'utf-8');
const countries = JSON.parse(raw);

const rows = [];

for (const country of countries) {
	const countryCode = country.cca3;
	if (country.currencies && country.currencies.length > 0) {
		for (const currencyCode of Object.keys(country.currencies)) {
			rows.push({
				country_code: countryCode,
				currency_code: currencyCode
			});
		}
	}
}

const csv = 'country_code,currency_code\n' + rows.map((row) => `${row.country_code},${row.currency_code}`).join('\n');

fs.writeFileSync('/output/country_currencies.csv', csv);

console.log('✅ country_currencies.csv generated successfully!');
