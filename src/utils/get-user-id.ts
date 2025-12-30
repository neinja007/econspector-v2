import { supabase } from '@/supabase/clients/client';

export const getUserId = async () => {
	const {
		data: { session },
		error
	} = await supabase.auth.getSession();
	if (error) throw error;
	return session?.user?.id;
};
