'use client';

import { useUser } from '@/hooks/react-query/queries/use-user';
import { Button } from './shadcn/ui/button';
import { LogInIcon } from 'lucide-react';

export const AuthButton = () => {
	const { data: user } = useUser();

	return user ? null : (
		<Button variant='outline'>
			<LogInIcon className='size-4' />
			<span>Sign in</span>
		</Button>
	);
};
