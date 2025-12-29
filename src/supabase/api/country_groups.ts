import { DatabaseSchema, DatabaseTable } from '@/types/supabase';
import { supabase } from '../clients/client';
import { CountryGroup } from '@/types/country';

export const getCountryGroups = async (): Promise<
	{ id: string; name: string; description: string; core: boolean; countries: string[] }[]
> => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.COUNTRY_GROUPS)
		.select('id, name, description, core, countries:country_groups_countries(country_cca3)');
	if (error) throw error;

	return (data || []).map((group) => ({
		id: group.id,
		name: group.name,
		description: group.description,
		core: group.core,
		countries: (group.countries || []).map((country: { country_cca3: string }) => country.country_cca3)
	}));
};

export const getCountryGroup = async (id: string): Promise<CountryGroup> => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.COUNTRY_GROUPS)
		.select('*, countries:country_groups_countries(country_cca3)')
		.eq('id', id);
	if (error) throw error;
	return {
		id: data[0].id,
		name: data[0].name,
		description: data[0].description,
		core: data[0].core,
		countries: (data[0].countries || []).map((country: { country_cca3: string }) => country.country_cca3)
	};
};

export const addCountryToGroup = async (countryCode: string, groupId: string) => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.COUNTRY_GROUPS_COUNTRIES)
		.upsert({ group_id: groupId, country_cca3: countryCode }, { onConflict: 'group_id, country_cca3' });
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
