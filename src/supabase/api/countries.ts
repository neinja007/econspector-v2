import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/clients/client';
import { Country, CountryWithCurrencies } from '@/types/country';

async function getCountries(): Promise<{ data: Country[]; count: number }> {
	const { data, error, count } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.COUNTRIES)
		.select('*', {
			count: 'estimated'
		})
		.order('name', { ascending: true });
	if (error) throw error;
	return { data, count: count ?? 0 };
}

async function getCountry(code: string): Promise<CountryWithCurrencies> {
	const { data, error } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.COUNTRIES)
		.select('*, currencies(*)')
		.eq('cca3', code);
	if (error) throw error;
	return data[0];
}

type RankedCountry = Country & {
	averageValue: number;
	rank: number;
};

async function getRankedCountries(
	level: 'countries' | 'regions' | 'subregions',
	sourceId: number,
	timespan: [number, number]
): Promise<RankedCountry[]> {
	// For now, assume level is always 'countries'
	if (level !== 'countries') {
		throw new Error('Only "countries" level is currently supported');
	}

	const [startYear, endYear] = timespan;

	// Fetch all time series data for the given sourceId within the timespan
	const { data: timeSeriesData, error: timeSeriesError } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.TIME_SERIES_DATA)
		.select('country_code, period, value')
		.eq('source_id', sourceId)
		.gte('period', startYear.toString())
		.lte('period', endYear.toString());

	if (timeSeriesError) throw timeSeriesError;

	// Group by country_code and calculate average
	const countryAverages = new Map<string, { sum: number; count: number }>();

	for (const record of timeSeriesData ?? []) {
		if (record.value === null || record.value === undefined) continue;

		const existing = countryAverages.get(record.country_code);
		if (existing) {
			existing.sum += record.value;
			existing.count += 1;
		} else {
			countryAverages.set(record.country_code, {
				sum: record.value,
				count: 1
			});
		}
	}

	// Calculate averages and create array of country codes with their averages
	const countryCodesWithAverages = Array.from(countryAverages.entries())
		.map(([countryCode, { sum, count }]) => ({
			countryCode,
			averageValue: sum / count
		}))
		.sort((a, b) => b.averageValue - a.averageValue); // Sort descending

	// Fetch all countries
	const { data: countries, error: countriesError } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.COUNTRIES)
		.select('*')
		.in(
			'cca3',
			countryCodesWithAverages.map((item) => item.countryCode)
		);

	if (countriesError) throw countriesError;

	// Create a map for quick lookup
	const countryMap = new Map(countries?.map((country) => [country.cca3, country]) ?? []);

	// Combine countries with their averages and assign ranks
	const rankedCountries: RankedCountry[] = countryCodesWithAverages
		.map((item, index) => {
			const country = countryMap.get(item.countryCode);
			if (!country) return null;

			return {
				...country,
				averageValue: item.averageValue,
				rank: index + 1
			};
		})
		.filter((country): country is RankedCountry => country !== null);

	return rankedCountries;
}

export { getCountries, getCountry, getRankedCountries };
export type { RankedCountry };
