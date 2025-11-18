import { supabase } from '@/supabase/client';

export const updateUserProfile = async (userId: string, name: string, email: string) => {
	const { data, error } = await supabase
		.from('users')
		.upsert({ id: userId, name, email, last_active: new Date().toISOString() })
		.select()
		.single();

	if (error) throw error;
	return data;
};
