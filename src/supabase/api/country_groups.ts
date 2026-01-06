import { emptyUuid } from '@/utils/empty-uuid';
import { supabase } from '../clients/client';
import { getUserId } from '@/utils/get-user-id';

export const getCountryGroups = async () => {
	const userId = await getUserId();
	const { data, error } = await supabase.schema('users').rpc('get_country_groups', {
		p_source_id: 35, // GDP constant 2015 USD PPP, World Bank, Annual
		p_user_id: userId ?? emptyUuid
	});
	if (error) throw error;
	return data;
};

export const getCountryGroup = async (id: number) => {
	const { data, error } = await supabase
		.schema('users')
		.from('country_groups')
		.select('*, countries:country_groups_countries(country_cca3)')
		.eq('id', id)
		.maybeSingle();
	if (error) throw error;
	if (!data) {
		return undefined;
	}
	return {
		...data,
		countries: data.countries.map((country) => country.country_cca3)
	};
};

export const addCountryToGroup = async (countryCode: string, groupId: number) => {
	const { data, error } = await supabase
		.schema('users')
		.from('country_groups_countries')
		.upsert({ group_id: groupId, country_cca3: countryCode }, { onConflict: 'group_id, country_cca3' });
	if (error) throw error;
	return data;
};

export const removeCountryFromGroup = async (countryCode: string, groupId: number) => {
	const { data, error } = await supabase
		.schema('users')
		.from('country_groups_countries')
		.delete()
		.eq('group_id', groupId)
		.eq('country_cca3', countryCode);

	if (error) throw error;
	return data;
};
