import { supabase } from '@/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
	return useQuery<User | null>({
		queryKey: ['user'],
		queryFn: async () => (await supabase.auth.getUser()).data.user
	});
};
