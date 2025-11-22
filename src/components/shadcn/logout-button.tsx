'use client';

import { createClient } from '@/utils/shadcn/client';
import { Button } from '@/components/shadcn/ui/button';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

type LogoutButtonProps = {
	children: React.ReactNode;
};

export function LogoutButton({ children }: LogoutButtonProps) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const logout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		await queryClient.invalidateQueries({ queryKey: ['user'] });
		router.push('/auth/login');
	};

	return (
		<Button onClick={logout} asChild>
			{children}
		</Button>
	);
}
