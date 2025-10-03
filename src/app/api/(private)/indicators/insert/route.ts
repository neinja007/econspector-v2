import { indicators } from '../../../../../../private/raw-data/indicators';
import { NextResponse } from 'next/server';
import { adminSupabase } from '@/supabase/admin';
import { DatabaseSchema, DatabaseTable } from '@/data/supabase';

export const GET = async () => {
	if (process.env.ENABLE_ADMIN_SCRIPTS !== 'true') {
		return NextResponse.json({ message: 'Admin scripts are not enabled. Nice try.' }, { status: 403 });
	}

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

			console.log(dbIndicator);

			for (const subindicator of indicator.subindicators) {
				const dbSubindicator = await adminSupabase
					.schema(DatabaseSchema.DATA)
					.from(DatabaseTable.INDICATORS)
					.insert({ name: subindicator.name, parent_id: dbIndicator.data.id })
					.select()
					.single();

				for (const frequency of subindicator.frequencies) {
					const dbFrequency = await adminSupabase
						.schema(DatabaseSchema.DATA)
						.from(DatabaseTable.INDICATOR_FREQUENCIES)
						.insert({ frequency: frequency.frequency, indicator_id: dbSubindicator.data.id })
						.select()
						.single();

					for (const source of frequency.sources) {
						await adminSupabase
							.schema(DatabaseSchema.DATA)
							.from(DatabaseTable.FREQUENCY_SOURCES)
							.insert({ frequency_id: dbFrequency.data.id, name: source.source, unit: source.unit })
							.select()
							.single();
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
