const fs = require('fs');
const path = require('path');

// Paths - resolve to absolute paths
const csvPath = path.resolve(__dirname, 'country_data.csv');
const archive1x1Path = path.resolve(__dirname, '../../archive/flags/1x1');
const archive4x3Path = path.resolve(__dirname, '../../archive/flags/4x3');
const public1x1Path = path.resolve(__dirname, '../../../public/flags/1x1');
const public4x3Path = path.resolve(__dirname, '../../../public/flags/4x3');

// Create output directories if they don't exist
if (!fs.existsSync(public1x1Path)) {
	fs.mkdirSync(public1x1Path, { recursive: true });
}
if (!fs.existsSync(public4x3Path)) {
	fs.mkdirSync(public4x3Path, { recursive: true });
}

// CSV parser that handles quoted fields with commas
function parseCSVLine(line) {
	const result = [];
	let current = '';
	let inQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];

		if (char === '"') {
			if (inQuotes && line[i + 1] === '"') {
				// Escaped quote
				current += '"';
				i++;
			} else {
				// Toggle quote state
				inQuotes = !inQuotes;
			}
		} else if (char === ',' && !inQuotes) {
			// End of field
			result.push(current);
			current = '';
		} else {
			current += char;
		}
	}

	// Add last field
	result.push(current);
	return result;
}

// Extract cca3 (first column) and cca2 (fourth column)
function extractFields(line) {
	const parts = parseCSVLine(line);
	return {
		cca3: parts[0]?.trim() || '',
		cca2: parts[3]?.trim() || ''
	};
}

// Read and parse CSV
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');

let successCount = 0;
let errorCount = 0;
const errors = [];

// Process each country (skip header)
for (let i = 1; i < lines.length; i++) {
	const { cca3, cca2 } = extractFields(lines[i]);
	const cca2Lower = cca2.toLowerCase(); // Flags are lowercase

	if (!cca3 || !cca2Lower) {
		console.warn(`Skipping row ${i + 1}: missing cca3 or cca2`);
		continue;
	}

	// Source and destination paths
	const source1x1 = path.join(archive1x1Path, `${cca2Lower}.svg`);
	const source4x3 = path.join(archive4x3Path, `${cca2Lower}.svg`);
	const dest1x1 = path.join(public1x1Path, `${cca3}.svg`);
	const dest4x3 = path.join(public4x3Path, `${cca3}.svg`);

	// Debug: print first few paths
	if (i === 1) {
		console.log(`Debug - archive1x1Path: ${archive1x1Path}`);
		console.log(`Debug - source1x1 (first): ${source1x1}`);
		console.log(`Debug - exists: ${fs.existsSync(source1x1)}`);
	}

	// Copy 1x1 flag
	if (fs.existsSync(source1x1)) {
		try {
			fs.copyFileSync(source1x1, dest1x1);
			successCount++;
		} catch (error) {
			errorCount++;
			errors.push(`Error copying 1x1 flag for ${cca3}: ${error.message}`);
		}
	} else {
		errorCount++;
		errors.push(`1x1 flag not found for ${cca3} (cca2: ${cca2Lower})`);
	}

	// Copy 4x3 flag
	if (fs.existsSync(source4x3)) {
		try {
			fs.copyFileSync(source4x3, dest4x3);
		} catch (error) {
			errorCount++;
			errors.push(`Error copying 4x3 flag for ${cca3}: ${error.message}`);
		}
	} else {
		errorCount++;
		errors.push(`4x3 flag not found for ${cca3} (cca2: ${cca2Lower})`);
	}
}

console.log(`\n✅ Successfully processed ${successCount} countries`);
console.log(`❌ Errors: ${errorCount}`);
if (errors.length > 0) {
	console.log('\nErrors:');
	errors.forEach((err) => console.log(`  - ${err}`));
}

// Count final files
const final1x1Count = fs.readdirSync(public1x1Path).filter((f) => f.endsWith('.svg')).length;
const final4x3Count = fs.readdirSync(public4x3Path).filter((f) => f.endsWith('.svg')).length;

console.log(`\n📊 Final counts:`);
console.log(`  - public/flags/1x1: ${final1x1Count} SVG files`);
console.log(`  - public/flags/4x3: ${final4x3Count} SVG files`);
