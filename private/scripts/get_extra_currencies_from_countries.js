import fs from 'fs';

const raw = fs.readFileSync('private/raw-data/countries.json', 'utf-8');
const rawCurrencies = fs.readFileSync('private/raw-data/currencies.json', 'utf-8');
const countries = JSON.parse(raw);
const currencies = JSON.parse(rawCurrencies);

const rows = [];

const existingCurrencyNames = new Set(
	Object.values(currencies)
		.map((c) => (c && c.name ? String(c.name).trim() : ''))
		.filter(Boolean)
);
const seenCodes = new Set(Object.keys(currencies));

for (const country of countries) {
	if (country.currencies) {
		for (const currencyCode of Object.keys(country.currencies)) {
			const code = String(currencyCode).trim();
			if (seenCodes.has(code)) {
				continue;
			}
			const candidate = country.currencies[currencyCode] || {};
			const candidateName = candidate.name ? String(candidate.name).trim() : '';
			if (candidateName && existingCurrencyNames.has(candidateName)) {
				console.log(
					`Skipping currency with existing name: code="${code}", name="${candidateName}" (country: ${
						country.cca2 || country.ccn3 || country.name?.common || 'unknown'
					})`
				);
				continue;
			}
			if (!seenCodes.has(code)) {
				rows.push({
					currency_code: code,
					name: candidateName,
					symbol: candidate.symbol,
					symbol_native: candidate.symbol
				});
				seenCodes.add(code);
			}
		}
	}
}

rows.sort((a, b) => a.currency_code.localeCompare(b.currency_code));

const csv =
	'currency_code,name,symbol,symbol_native\n' +
	rows.map((row) => `${row.currency_code},${row.name},${row.symbol},${row.symbol_native}`).join('\n');

fs.writeFileSync('private/scripts/output/extra_currencies.csv', csv);

console.log('✅ extra_currencies.csv generated successfully!');
