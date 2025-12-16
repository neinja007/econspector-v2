export type RankedItem = {
	type: 'country' | 'region' | 'subregion';
	score: number;
	code: string;
	coverage: (Coverage | TemporalCoverage)[];
	rank: number;
};

export type Coverage = {
	code: string;
	label: string;
	coverage: CoverageData[];
}[];

export type TemporalCoverage = {
	code: 'temporal';
	label: 'Temporal Coverage';
	coverage: CoverageData[];
};

export type CoverageData = {
	code: string;
	covered: boolean;
};
