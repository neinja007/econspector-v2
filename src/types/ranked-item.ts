export type RankedItem = {
	score: number;
	item: {
		type: 'country' | 'region' | 'subregion';
		code: string;
		name: string;
		fullName?: string;
		iconPath?: string;
	};
	coverage: (Coverage | TemporalCoverage)[];
	rank: number;
};

export type Coverage = {
	code: string;
	label: string;
	coverage: CoverageData[];
};

export type TemporalCoverage = Coverage & {
	code: 'temporal';
	label: 'Temporal Coverage';
	coverage: CoverageData[];
};

export type CoverageData = {
	code: string;
	covered: boolean;
};
