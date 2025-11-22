import { supabase } from '@/supabase/client';
import { User } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useUser = () => {
	const queryClient = useQueryClient();

	const query = useQuery<User | null>({
		queryKey: ['user'],
		queryFn: async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error) {
				if (error.name !== 'AuthSessionMissingError') {
					console.error('Failed to fetch user:', error);
				}
				return null;
			}
			return data.user;
		}
	});

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [queryClient]);

	return query;
};
