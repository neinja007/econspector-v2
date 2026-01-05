import { adminSupabase } from '@/supabase/clients/admin';
import { NextResponse } from 'next/server';
import { indicators } from '../../../../../private/data/indicators';

export const POST = async () => {
	const existingIndicators = await adminSupabase.schema('data').from('indicators').select('*');
	const dataSources = await adminSupabase.schema('data').from('data_sources').select('*');
	const skippedIndicators = [];
	const createdIndicators = [];

	for (const indicator of indicators) {
		if (existingIndicators.data?.some((i) => i.name === indicator.name)) {
			skippedIndicators.push(indicator.name);
			continue;
		} else {
			createdIndicators.push(indicator.name);
		}

		if ('subindicators' in indicator) {
			const dbIndicator = await adminSupabase
				.schema('data')
				.from('indicators')
				.insert({ name: indicator.name, code: indicator.abbreviation })
				.select()
				.single();

			if (dbIndicator.error || !dbIndicator.data) {
				console.error('Failed to create indicator:', dbIndicator.error);
				continue;
			}

			for (const subindicator of indicator.subindicators) {
				const dbSubindicator = await adminSupabase
					.schema('data')
					.from('indicators')
					.insert({
						name: subindicator.name,
						code: subindicator.abbreviation,
						parent_id: dbIndicator.data.id,
						unit: subindicator.unit,
						chart_type: subindicator.chart_type
					})
					.select()
					.single();

				if (dbSubindicator.error || !dbSubindicator.data) {
					console.error('Failed to create subindicator:', dbSubindicator.error);
					continue;
				}

				for (const frequency of subindicator.frequencies) {
					const dbFrequency = await adminSupabase
						.schema('data')
						.from('indicator_frequencies')
						.insert({ frequency: frequency.frequency, indicator_id: dbSubindicator.data.id })
						.select()
						.single();

					if (dbFrequency.error || !dbFrequency.data) {
						console.error('Failed to create frequency:', dbFrequency.error, 'Frequency data:', frequency);
						continue;
					}

					for (const source of frequency.sources) {
						const dataSourceId = dataSources.data?.find((ds) => ds.name === source.source)?.id;
						const dataSource = dataSources.data?.find((ds) => ds.name === source.source);
						if (!dataSourceId || !dataSource) {
							console.error('Failed to find data source:', source.source);
							continue;
						}
						const dbSource = await adminSupabase
							.schema('data')
							.from('frequency_sources')
							.insert({
								frequency_id: dbFrequency.data.id,
								data_source: dataSourceId,
								'wb-code': source.code,
								origin: 'SOURCE'
							})
							.select()
							.single();

						if (dbSource.error || !dbSource.data) {
							console.error('Failed to create frequency source:', dbSource.error, 'Source data:', source);
						}
					}
				}
			}
		} else {
			const dbIndicator = await adminSupabase
				.schema('data')
				.from('indicators')
				.insert({
					name: indicator.name,
					code: indicator.abbreviation,
					unit: indicator.unit,
					chart_type: indicator.chart_type
				})
				.select()
				.single();

			if (dbIndicator.error || !dbIndicator.data) {
				console.error('Failed to create indicator:', dbIndicator.error);
				continue;
			}

			for (const frequency of indicator.frequencies) {
				const dbFrequency = await adminSupabase
					.schema('data')
					.from('indicator_frequencies')
					.insert({ frequency: frequency.frequency, indicator_id: dbIndicator.data.id })
					.select()
					.single();

				if (dbFrequency.error || !dbFrequency.data) {
					console.error('Failed to create frequency:', dbFrequency.error, 'Frequency data:', frequency);
					continue;
				}

				for (const source of frequency.sources) {
					const dataSourceId = dataSources.data?.find((ds) => ds.name === source.source)?.id;
					const dataSource = dataSources.data?.find((ds) => ds.name === source.source);
					if (!dataSourceId || !dataSource) {
						console.error('Failed to find data source:', source.source);
						continue;
					}
					const dbSource = await adminSupabase
						.schema('data')
						.from('frequency_sources')
						.insert({
							frequency_id: dbFrequency.data.id,
							data_source: dataSourceId,
							'wb-code': source.code,
							origin: 'SOURCE'
						})
						.select()
						.single();

					if (dbSource.error || !dbSource.data) {
						console.error('Failed to create frequency source:', dbSource.error, 'Source data:', source);
					}
				}
			}
		}
	}
	return NextResponse.json({
		message: 'Indicators added to database',
		created: createdIndicators,
		skipped: skippedIndicators
	});
};

export const DELETE = async () => {
	await adminSupabase.schema('data').from('indicators').delete().neq('id', 0);
	await adminSupabase.schema('data').from('indicator_frequencies').delete().neq('id', 0);
	await adminSupabase.schema('data').from('frequency_sources').delete().neq('id', 0);

	return NextResponse.json({ message: 'Indicators deleted from database' });
};
