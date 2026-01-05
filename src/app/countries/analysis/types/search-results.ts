import { DbDataTables } from '@/types/db/alias';
import { CountryGroup } from '@/types/db/types/country-group';

export type CountryOrGroup =
	| {
			type: 'country';
			data: DbDataTables<'countries'>;
	  }
	| {
			type: 'group';
			data: CountryGroup;
	  };
