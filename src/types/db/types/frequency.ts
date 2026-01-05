export enum Frequency {
	ANNUAL = 'ANNUAL',
	BIANNUAL = 'BIANNUAL',
	QUARTERLY = 'QUARTERLY',
	MONTHLY = 'MONTHLY'
}

export const FrequencyMap = {
	[Frequency.ANNUAL]: 'Annual',
	[Frequency.BIANNUAL]: 'Biannual',
	[Frequency.QUARTERLY]: 'Quarterly',
	[Frequency.MONTHLY]: 'Monthly'
};

export const FrequencyAbbreviationMap = {
	[Frequency.ANNUAL]: 'AN',
	[Frequency.BIANNUAL]: 'BI',
	[Frequency.QUARTERLY]: 'QU',
	[Frequency.MONTHLY]: 'MO'
};
