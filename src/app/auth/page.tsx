'use client';

import { useUser } from '@/hooks/react-query/queries/use-user';
import { supabase } from '@/supabase/clients/client';
import { Coins, Key, LogOut, LucideIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const accountRoutes: { title: string; icon: LucideIcon; description: string; href: string }[] = [
	{
		title: 'Change Password',
		icon: Key,
		description: 'Change the password for your account',
		href: '/auth/update-password'
	}
];

const otherRoutes: { title: string; icon: LucideIcon; description: string; href: string }[] = [
	{
		title: 'Purchase Credits',
		icon: Coins,
		description: 'Purchase credits to use advanced features of EconSpector',
		href: '/credits'
	},
	{
		title: 'Settings',
		icon: Settings,
		description: 'Change your account settings and preferences',
		href: '/settings'
	}
];

const Page = () => {
	const { data: user } = useUser();
	const router = useRouter();

	const logout = async () => {
		await supabase.auth.signOut();
	};

	if (!user) {
		router.push('/auth/sign-up');
	}

	return (
		<div className='flex flex-col gap-4 w-full'>
			{accountRoutes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className='border px-4 py-2 rounded-md text-lg hover:bg-accent transition-colors'
				>
					<div className='flex flex-col gap-1'>
						<div className='text-lg font-medium flex items-center gap-2'>
							<route.icon className='size-5' /> {route.title}
						</div>
						<div className='text-sm text-muted-foreground'>{route.description}</div>
					</div>
				</Link>
			))}
			<hr className='my-2 border-blue-500/30' />
			{otherRoutes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className='border px-4 py-2 rounded-md text-lg hover:bg-accent transition-colors'
				>
					<div className='flex flex-col gap-1'>
						<div className='text-lg font-medium flex items-center gap-2'>
							<route.icon className='size-5' /> {route.title}
						</div>
						<div className='text-sm text-muted-foreground'>{route.description}</div>
					</div>
				</Link>
			))}
			<button
				onClick={logout}
				className='border px-4 py-2 rounded-md text-lg hover:bg-accent transition-colors text-left'
			>
				<div className='flex flex-col gap-1'>
					<div className='text-lg font-medium flex items-center gap-2'>
						<LogOut className='size-5' /> Log Out
					</div>
					<div className='text-sm text-muted-foreground'>Log out of your account on this device</div>
				</div>
			</button>
		</div>
	);
};

export default Page;
