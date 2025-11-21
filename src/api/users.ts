import { DatabaseSchema, DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';

export const updateUserProfile = async (userId: string, name: string, email: string) => {
	const { data, error } = await supabase
		.schema(DatabaseSchema.USERS)
		.from(DatabaseTable.USERS)
		.upsert({ id: userId, name, email, last_active: new Date().toISOString() })
		.select()
		.single();

	window.sessionStorage.setItem('updated-user', 'true');

	if (error) throw error;
	return data;
};
