export type CountryGroup = {
	id: number;
	name: string;
	description: string | null;
	core: boolean;
	countries: string[];
};
