import { DatabaseSchema, DatabaseTable } from '@/types/supabase';
import { supabase } from '../clients/client';

export const getFavouriteCountries = async (): Promise<string[]> => {
	const { data, error } = await supabase

		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.COUNTRY_GROUPS)
		.select('countries(*)')
		.eq('name', 'Favourites');

	if (error) throw error;
	return data[0].countries.map((country) => country.cca3);
};

export const getCountryGroups = async (): Promise<{ id: string; name: string }[]> => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.COUNTRY_GROUPS)
		.select('id, name, description, core');
	if (error) throw error;
	return data;
};

export const addCountryToGroup = async (countryCode: string, groupId: string) => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.COUNTRY_GROUPS_COUNTRIES)
		.upsert({ group_id: groupId, country_cca3: countryCode }, { onConflict: 'country_group_id, country_cca3' });
	if (error) throw error;
	return data;
};

export const removeCountryFromGroup = async (countryCode: string, groupId: string) => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.COUNTRY_GROUPS_COUNTRIES)
		.delete()
		.eq('group_id', groupId)
		.eq('country_cca3', countryCode);

	if (error) throw error;
	return data;
};
