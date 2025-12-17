import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/clients/client';
import { Country, CountryWithCurrencies } from '@/types/country';
import { RankedItem } from '@/types/ranked-item';

async function getCountries(): Promise<{ data: Country[]; count: number }> {
	const { data, error, count } = await supabase
		.schema(DatabaseSchema.DATA)
		.from(DatabaseTable.COUNTRIES)
		.select('*', {
			count: 'estimated',
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

async function getRankedCountries(
	level: 'countries' | 'regions' | 'subregions',
	sourceId: number,
	timespan: [number, number]
): Promise<RankedItem[]> {
	try {
		if (level !== 'countries') {
			throw new Error('Only "countries" level is currently supported');
		}

		const [startYear, endYear] = timespan;
		const timeSpanItems: number[] = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

		const { data: timeSeriesData, error: timeSeriesError } = (await supabase
			.schema(DatabaseSchema.DATA)
			.from(DatabaseTable.TIME_SERIES_DATA)
			.select('period, value, country:country_code(*)')
			.eq('source_id', sourceId)
			.gte('period', startYear.toString())
			.lte('period', endYear.toString())) as unknown as {
			data: { period: string; value: number; country: Country }[];
			error: Error | null;
		};

		if (timeSeriesError) {
			console.error('timeSeriesError', timeSeriesError);
			throw timeSeriesError;
		}

		console.log('timeSeriesData', timeSeriesData);

		// Group by country_code and calculate average
		const countryData = new Map<
			string,
			{ item: RankedItem['item']; dataPoints: { period: string; value: number }[] }
		>();

		for (const record of timeSeriesData ?? []) {
			if (record.value === null || record.value === undefined) continue;

			if (!record.country || !record.country.name) {
				console.warn(`Missing country data for country: ${record.country.cca3}`);
				continue;
			}

			const existing = countryData.get(record.country.cca3);
			if (existing) {
				existing.dataPoints.push({ period: record.period, value: record.value });
			} else {
				countryData.set(record.country.cca3, {
					item: {
						type: 'country',
						code: record.country.cca3,
						name: record.country.name,
						fullName: record.country.full_name,
						iconPath: record.country.cca2,
					},
					dataPoints: [{ period: record.period, value: record.value }],
				});
			}
		}

		const rankedItems: RankedItem[] = Array.from(countryData.entries())
			.map(([_, { item, dataPoints }]) => ({
				score: dataPoints.reduce((sum, point) => sum + point.value, 0) / dataPoints.length,
				item,
				coverage: [
					{
						code: 'temporal' as const,
						label: 'Temporal Coverage' as const,
						coverage: timeSpanItems.map((year) => ({
							code: year.toString(),
							covered: dataPoints.some((point) => point.period === year.toString()),
						})),
					},
				],
				rank: 0,
				type: 'country',
			}))
			.sort((a, b) => b.score - a.score)
			.map((item, index) => ({
				...item,
				rank: index + 1,
			}));

		return rankedItems;
	} catch (error) {
		console.error('Error in getRankedCountries:', error);
		throw error;
	}
}

export { getCountries, getCountry, getRankedCountries };
