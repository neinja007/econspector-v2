import { DatabaseSchema, DatabaseTable } from '@/types/supabase';
import { supabase } from '../clients/client';

export const getFavouriteCountries = async (): Promise<string[]> => {
	const { data, error } = await supabase

		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.FAVOURITE_COUNTRIES)
		.select('country_cca3');

	if (error) throw error;
	return data.map((country) => country.country_cca3);
};

export const addFavouriteCountry = async (countryCode: string) => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.FAVOURITE_COUNTRIES)
		.insert({ country_cca3: countryCode });

	if (error) throw error;
	return data;
};

export const removeFavouriteCountry = async (countryCode: string) => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.FAVOURITE_COUNTRIES)
		.delete()
		.eq('country_cca3', countryCode);

	if (error) throw error;
	return data;
};
