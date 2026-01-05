import { supabase } from '@/supabase/clients/client';
import { DbDataFunctions, DbDataTables } from '@/types/db/alias';

async function getCountries(): Promise<{ data: DbDataTables<'countries'>; count: number | null }> {
	const { data, error, count } = await supabase
		.schema('data')
		.from('countries')
		.select('*', {
			count: 'estimated'
		})
		.order('name', { ascending: true });
	if (error) throw error;
	return { data, count };
}

// TODO: use maybesingle everywhere you need to, like below

async function getCountry(code: string) {
	const { data, error } = await supabase
		.schema('data')
		.from('countries_with_currencies')
		.select('*')
		.eq('cca3', code)
		.maybeSingle();
	if (error) throw error;
	if (!data) {
		return undefined;
	}
	return data;
}

// async function getRankedCountries(
// 	level: 'countries' | 'regions' | 'subregions',
// 	sourceId: number,
// 	timespan: [number, number]
// ): Promise<RankedItem[]> {
// 	try {
// 		if (level !== 'countries') {
// 			throw new Error('Only "countries" level is currently supported');
// 		}

// 		const [startYear, endYear] = timespan;
// 		const timeSpanItems: number[] = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

// 		const { data: timeSeriesData, error: timeSeriesError } = (await supabase
// 			.schema(DatabaseSchema.DATA)
// 			.from(DatabaseTable.TIME_SERIES_DATA)
// 			.select('period, value, country:country_code(*)')
// 			.eq('source_id', sourceId)
// 			.gte('period', startYear.toString())
// 			.lte('period', endYear.toString())) as unknown as {
// 			data: { period: string; value: number; country: Country }[];
// 			error: Error | null;
// 		};

// 		if (timeSeriesError) {
// 			console.error('timeSeriesError', timeSeriesError);
// 			throw timeSeriesError;
// 		}

// 		console.log('timeSeriesData', timeSeriesData);

// 		// Group by country_code and calculate average
// 		const countryData = new Map<
// 			string,
// 			{ item: RankedItem['item']; dataPoints: { period: string; value: number }[] }
// 		>();

// 		for (const record of timeSeriesData ?? []) {
// 			if (record.value === null || record.value === undefined) continue;

// 			if (!record.country || !record.country.name) {
// 				console.warn(`Missing country data for country: ${record.country.cca3}`);
// 				continue;
// 			}

// 			const existing = countryData.get(record.country.cca3);
// 			if (existing) {
// 				existing.dataPoints.push({ period: record.period, value: record.value });
// 			} else {
// 				countryData.set(record.country.cca3, {
// 					item: {
// 						type: 'country',
// 						code: record.country.cca3,
// 						name: record.country.name,
// 						fullName: record.country.full_name,
// 					},
// 					dataPoints: [{ period: record.period, value: record.value }],
// 				});
// 			}
// 		}

// 		const rankedItems: RankedItem[] = Array.from(countryData.entries())
// 			.map(([_, { item, dataPoints }]) => ({
// 				score: dataPoints.reduce((sum, point) => sum + point.value, 0) / dataPoints.length,
// 				item,
// 				coverage: [
// 					{
// 						code: 'temporal' as const,
// 						label: 'Temporal Coverage' as const,
// 						coverage: timeSpanItems.map((year) => ({
// 							code: year.toString(),
// 							covered: dataPoints.some((point) => point.period === year.toString()),
// 						})),
// 					},
// 				],
// 				rank: 0,
// 				type: 'country',
// 			}))
// 			.sort((a, b) => b.score - a.score)
// 			.map((item, index) => ({
// 				...item,
// 				rank: index + 1,
// 			}));

// 		return rankedItems;
// 	} catch (error) {
// 		console.error('Error in getRankedCountries:', error);
// 		throw error;
// 	}
// }

const getRankedCountries = async (
	type: 'countries' | 'regions' | 'subregions',
	sourceId: number,
	timePeriod: [number, number]
): Promise<DbDataFunctions<'get_ranked_countries'>> => {
	const { data } = await supabase.schema('data').rpc('get_ranked_countries', {
		p_level: type,
		p_source_id: sourceId,
		p_start_year: timePeriod?.[0] ?? 0,
		p_end_year: timePeriod?.[1] ?? 0
	});
	return data;
};

export { getCountries, getCountry, getRankedCountries };
