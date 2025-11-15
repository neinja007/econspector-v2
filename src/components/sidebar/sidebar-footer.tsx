'use client';

import { SignedIn, SignedOut, useUser, SignOutButton } from '@clerk/nextjs';
import { UserCircle2, Settings, LogOut, ChevronUp } from 'lucide-react';
import { SidebarFooter as SidebarFooterShadcn } from '@/components/shadcn/ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/shadcn/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export const SidebarFooter = () => {
	const { user } = useUser();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<SidebarFooterShadcn className='w-full border-t h-[70px] flex justify-center select-none'>
			<SignedOut>
				<Link
					href='/user/sign-in'
					className='flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-sm p-1 h-full transition-colors'
				>
					<UserCircle2 strokeWidth={1} className='size-10 text-gray-700' />
					<div className='flex flex-col'>
						<div className='text-lg font-medium'>Register or Sign in</div>
						<div className='text-sm -mt-1'>to access all features</div>
					</div>
				</Link>
			</SignedOut>
			<SignedIn>
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<button className='flex items-center gap-2 rounded-sm p-1 transition-colors w-full hover:bg-accent cursor-pointer'>
							<div className='size-fit rounded-full overflow-hidden'>
								<Image src={user?.imageUrl || ''} alt={user?.username || user?.fullName || ''} width={40} height={40} />
							</div>
							<div className='flex flex-col flex-1 text-left'>
								<div className='text-lg font-medium flex justify-between items-center pr-2'>
									<span>{user?.username || user?.fullName}</span>
									<ChevronUp className={`ml-auto size-5 ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
								</div>
								<div className='text-sm -mt-1'>{user?.emailAddresses[0].emailAddress}</div>
							</div>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side='top'
						align='start'
						className='w-[var(--radix-dropdown-menu-trigger-width)] bg-sidebar border-t'
					>
						<DropdownMenuItem asChild>
							<Link href='/user/account'>
								<Settings /> Manage Account
							</Link>
						</DropdownMenuItem>
						<SignOutButton>
							<DropdownMenuItem asChild>
								<button className='cursor-pointer w-full'>
									<LogOut /> Log Out
								</button>
							</DropdownMenuItem>
						</SignOutButton>
					</DropdownMenuContent>
				</DropdownMenu>
			</SignedIn>
		</SidebarFooterShadcn>
	);
};
