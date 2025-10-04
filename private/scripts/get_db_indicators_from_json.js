import fs from 'fs';
// To run this file, use the following command in your terminal:
//
//   node private/scripts/get_db_indicators_from_json.js
//
// Make sure you are in the root directory of your project and have Node.js installed.

const indicators = JSON.parse(fs.readFileSync('private/raw-data/indicators.json', 'utf8'));

const indicatorRows = [];
const subindicatorRows = [];
const frequencyRows = [];
const sourceRows = [];

for (const indicator of indicators) {
	if (indicator.subindicators) {
		indicatorRows.push({
			name: indicator.name
		});
		for (const subindicator of indicator.subindicators) {
			subindicatorRows.push({
				name: subindicator.name,
				parent_id: 'temp:' + indicator.name
			});
			for (const frequency of subindicator.frequencies) {
				const temp_id = Math.random().toString(36).substring(2, 15);
				frequencyRows.push({
					frequency: frequency.frequency,
					temp_id: 'temp:' + temp_id,
					indicator_id: 'temp:' + subindicator.name
				});
				for (const source of frequency.sources) {
					sourceRows.push({
						frequency_id: 'temp:' + temp_id,
						source: source.source,
						unit: source.unit
					});
				}
			}
		}
	} else {
		indicatorRows.push({
			name: indicator.name
		});
		for (const frequency of indicator.frequencies) {
			const temp_id = Math.random().toString(36).substring(2, 15);
			frequencyRows.push({
				frequency: frequency.frequency,
				indicator_id: 'temp:' + indicator.name,
				temp_id: 'temp:' + temp_id
			});
			for (const source of frequency.sources) {
				sourceRows.push({
					frequency_id: 'temp:' + temp_id,
					source: source.source,
					unit: source.unit
				});
			}
		}
	}
}

const indicator_csv = 'name\n' + indicatorRows.map((row) => `${row.name}`).join('\n');
fs.writeFileSync('private/scripts/output/indicators/indicators.csv', indicator_csv);

const subindicator_csv = 'name,parent_id\n' + subindicatorRows.map((row) => `${row.name},${row.parent_id}`).join('\n');
fs.writeFileSync('private/scripts/output/indicators/subindicators.csv', subindicator_csv);

const frequency_csv =
	'temp_id,frequency,indicator_id\n' +
	frequencyRows.map((row) => `${row.temp_id},${row.frequency},${row.indicator_id}`).join('\n');
fs.writeFileSync('private/scripts/output/indicators/frequencies.csv', frequency_csv);

const source_csv =
	'frequency_id,source,unit\n' + sourceRows.map((row) => `${row.frequency_id},${row.source},${row.unit}`).join('\n');
fs.writeFileSync('private/scripts/output/indicators/sources.csv', source_csv);
