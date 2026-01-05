import { DbDataViews } from '@/types/db/alias';
import { CountryGroup } from '@/types/db/types/country-group';

export type CountryOrGroup =
	| {
			type: 'country';
			data: DbDataViews<'countries_with_currencies'>;
	  }
	| {
			type: 'group';
			data: CountryGroup;
	  };
