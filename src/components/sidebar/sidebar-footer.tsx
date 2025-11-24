'use client';

import { UserCircle2, Settings, LogOut, ChevronUp, User, Coins } from 'lucide-react';
import { SidebarFooter as SidebarFooterShadcn } from '@/components/shadcn/ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/shadcn/ui/dropdown-menu';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/hooks/react-query/queries/use-user';
import { supabase } from '@/supabase/clients/client';

export const SidebarFooter = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: user } = useUser();

	const logout = async () => {
		await supabase.auth.signOut();
	};

	return (
		<SidebarFooterShadcn className='w-full border-t h-[70px] flex justify-center select-none'>
			{!user ? (
				<Link
					href='/auth/sign-up'
					className='flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-sm p-1 h-full transition-colors'
				>
					<UserCircle2 strokeWidth={1} className='size-10 text-muted-foreground' />
					<div className='flex flex-col'>
						<div className='text-lg font-medium'>Register or Sign in</div>
						<div className='text-sm -mt-1'>to access all features</div>
					</div>
				</Link>
			) : (
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<button className='flex items-center gap-2 rounded-sm p-1 transition-colors w-full hover:bg-accent cursor-pointer'>
							<div className='size-fit rounded-full overflow-hidden'>
								{/* <Image
									src={user?.user_metadata.avatar_url || ''}
									alt={user?.email || ''}
									width={40}
									height={40}
									className='object-cover'
								/> */}
							</div>
							<div className='flex flex-col flex-1 text-left'>
								<div className='font-medium flex justify-between items-center pr-2'>
									<span>{user?.email}</span>
									<ChevronUp className={`ml-auto size-5 ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
								</div>
								<div className='text-sm -mt-1'>{user?.email}</div>
							</div>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side='top'
						align='start'
						className='w-[var(--radix-dropdown-menu-trigger-width)] bg-sidebar border-t'
					>
						<DropdownMenuItem>
							<Link href='/user/account' className='flex items-center gap-2'>
								<User /> Manage Account
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/user/account' className='flex items-center gap-2'>
								<Settings /> Settings & Preferences
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/user/account' className='flex items-center gap-2'>
								<Coins /> Purchase Credits
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={logout} className='cursor-pointer'>
							<LogOut /> Log Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</SidebarFooterShadcn>
	);
};
