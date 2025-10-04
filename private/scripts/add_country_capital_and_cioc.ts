import fs from 'fs';
import path from 'path';

interface CountryData {
	name: {
		common: string;
		official: string;
	};
	cca2: string;
	cca3: string;
	cioc?: string;
	capital?: string[];
	region: string;
	subregion: string;
}

interface CSVRow {
	country_code: string;
	name: string;
	full_name: string;
	region: string;
	cca2: string;
	ccn3: string;
	subregion: string;
	cioc: string;
	capital: string;
}

async function addCapitalAndCiocToCountries() {
	try {
		// Read the countries.json file
		const jsonPath = path.join(__dirname, '../raw-data/general/countries/countries.json');
		const jsonData = fs.readFileSync(jsonPath, 'utf8');
		const countries: CountryData[] = JSON.parse(jsonData);

		// Create a map for quick lookup by cca2 code
		const countryMap = new Map<string, CountryData>();
		countries.forEach((country) => {
			if (country.cca2) {
				countryMap.set(country.cca2, country);
			}
		});

		// Read the countries.csv file
		const csvPath = path.join(__dirname, '../raw-data/general/countries/countries.csv');
		const csvData = fs.readFileSync(csvPath, 'utf8');
		const lines = csvData.trim().split('\n');

		// Parse header and data
		const header = lines[0].split(',');
		const dataLines = lines.slice(1);

		// Process each row
		const updatedRows: string[] = [header.join(',')];

		for (const line of dataLines) {
			const columns = line.split(',');
			const row: CSVRow = {
				country_code: columns[0],
				name: columns[1],
				full_name: columns[2],
				region: columns[3],
				cca2: columns[4],
				ccn3: columns[5],
				subregion: columns[6],
				cioc: columns[7],
				capital: columns[8]
			};

			// Look up country data by cca2 code
			const countryData = countryMap.get(row.cca2);

			if (countryData) {
				// Update CIOC code if available
				if (countryData.cioc) {
					row.cioc = countryData.cioc;
				}

				// Update capital if available
				if (countryData.capital && countryData.capital.length > 0) {
					row.capital = countryData.capital[0]; // Take the first capital
				}
			}

			// Convert row back to CSV format
			const updatedLine = [
				row.country_code,
				row.name,
				row.full_name,
				row.region,
				row.cca2,
				row.ccn3,
				row.subregion,
				row.cioc,
				row.capital
			].join(',');

			updatedRows.push(updatedLine);
		}

		// Write the updated CSV file
		const updatedCsvContent = updatedRows.join('\n');
		fs.writeFileSync(csvPath, updatedCsvContent, 'utf8');

		console.log('Successfully updated countries.csv with capital and CIOC data');
		console.log(`Processed ${dataLines.length} countries`);

		// Show some statistics
		const countriesWithCioc = updatedRows.filter((row, index) => index > 0 && row.split(',')[7]).length;
		const countriesWithCapital = updatedRows.filter((row, index) => index > 0 && row.split(',')[8]).length;

		console.log(`Countries with CIOC code: ${countriesWithCioc}`);
		console.log(`Countries with capital: ${countriesWithCapital}`);
	} catch (error) {
		console.error('Error processing countries data:', error);
	}
}

// Run the script
addCapitalAndCiocToCountries();
