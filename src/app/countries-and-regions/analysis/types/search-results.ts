import { Country } from '@/types/country';
import { Region } from '@/types/region';
import { Subregion } from '@/types/subregion';

export type CountryOrRegion =
	| {
			type: 'country';
			data: Country;
	  }
	| {
			type: 'region';
			data: Region | Subregion;
	  };
