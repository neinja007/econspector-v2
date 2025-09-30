import { RegionEnum, SubregionEnum } from './region';

export type Country = {
	country_code: string;
	name: string;
	full_name: string;
	cca2: string;
	ccn3: string;
	region: RegionEnum;
	subregion: SubregionEnum | undefined;
};
