'use client';

import { useUser } from '@/hooks/react-query/queries/use-user';
import { Button } from './shadcn/ui/button';
import { LogInIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AuthButton = () => {
	const { data: user } = useUser();
	const router = useRouter();

	const handleSignUp = () => {
		router.push('/auth/sign-up');
	};

	return user ? null : (
		<Button variant='outline' onClick={handleSignUp}>
			<LogInIcon className='size-4' />
			<span>Sign up</span>
		</Button>
	);
};
