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
