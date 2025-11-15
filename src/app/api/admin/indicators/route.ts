import { adminSupabase } from '@/supabase/admin';
import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { NextResponse } from 'next/server';
import { indicators } from '../../../../../private/data/indicators';

export const POST = async () => {
	const existingIndicators = await adminSupabase.schema(DatabaseSchema.DATA).from(DatabaseTable.INDICATORS).select('*');
	const skippedIndicators = [];
	const createdIndicators = [];

	for (const indicator of indicators) {
		if (existingIndicators.data?.some((i) => i.name === indicator.name)) {
			skippedIndicators.push(indicator.name);
			continue;
		} else {
			createdIndicators.push(indicator);
		}

		if ('subindicators' in indicator) {
			const dbIndicator = await adminSupabase
				.schema(DatabaseSchema.DATA)
				.from(DatabaseTable.INDICATORS)
				.insert({ name: indicator.name })
				.select()
				.single();

			if (dbIndicator.error || !dbIndicator.data) {
				console.error('Failed to create indicator:', dbIndicator.error);
				continue;
			}

			for (const subindicator of indicator.subindicators) {
				const dbSubindicator = await adminSupabase
					.schema(DatabaseSchema.DATA)
					.from(DatabaseTable.INDICATORS)
					.insert({ name: subindicator.name, parent_id: dbIndicator.data.id })
					.select()
					.single();

				if (dbSubindicator.error || !dbSubindicator.data) {
					console.error('Failed to create subindicator:', dbSubindicator.error);
					continue;
				}

				for (const frequency of subindicator.frequencies) {
					const dbFrequency = await adminSupabase
						.schema(DatabaseSchema.DATA)
						.from(DatabaseTable.INDICATOR_FREQUENCIES)
						.insert({ frequency: frequency.frequency, indicator_id: dbSubindicator.data.id })
						.select()
						.single();

					if (dbFrequency.error || !dbFrequency.data) {
						console.error('Failed to create frequency:', dbFrequency.error, 'Frequency data:', frequency);
						continue;
					}

					for (const source of frequency.sources) {
						const dbSource = await adminSupabase
							.schema(DatabaseSchema.DATA)
							.from(DatabaseTable.FREQUENCY_SOURCES)
							.insert({ frequency_id: dbFrequency.data.id, name: source.source, unit: source.unit })
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
				.schema(DatabaseSchema.DATA)
				.from(DatabaseTable.INDICATORS)
				.insert({ name: indicator.name })
				.select()
				.single();

			if (dbIndicator.error || !dbIndicator.data) {
				console.error('Failed to create indicator:', dbIndicator.error);
				continue;
			}

			for (const frequency of indicator.frequencies) {
				const dbFrequency = await adminSupabase
					.schema(DatabaseSchema.DATA)
					.from(DatabaseTable.INDICATOR_FREQUENCIES)
					.insert({ frequency: frequency.frequency, indicator_id: dbIndicator.data.id })
					.select()
					.single();

				if (dbFrequency.error || !dbFrequency.data) {
					console.error('Failed to create frequency:', dbFrequency.error, 'Frequency data:', frequency);
					continue;
				}

				for (const source of frequency.sources) {
					const dbSource = await adminSupabase
						.schema(DatabaseSchema.DATA)
						.from(DatabaseTable.FREQUENCY_SOURCES)
						.insert({ frequency_id: dbFrequency.data.id, name: source.source, unit: source.unit })
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
	await adminSupabase.schema(DatabaseSchema.DATA).from(DatabaseTable.INDICATORS).delete().neq('id', 0);
	await adminSupabase.schema(DatabaseSchema.DATA).from(DatabaseTable.INDICATOR_FREQUENCIES).delete().neq('id', 0);
	await adminSupabase.schema(DatabaseSchema.DATA).from(DatabaseTable.FREQUENCY_SOURCES).delete().neq('id', 0);

	return NextResponse.json({ message: 'Indicators deleted from database' });
};
