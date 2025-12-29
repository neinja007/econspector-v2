import { Country, CountryGroup } from '@/types/country';

export type CountryOrGroup =
	| {
			type: 'country';
			data: Country;
	  }
	| {
			type: 'group';
			data: CountryGroup;
	  };
