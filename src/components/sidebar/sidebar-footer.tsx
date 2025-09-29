'use client';

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { UserCircle2 } from 'lucide-react';
import { SidebarFooter as SidebarFooterShadcn } from '@/components/shadcn/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';

export const SidebarFooter = () => {
	const { user } = useUser();

	return (
		<SidebarFooterShadcn className='w-full border-t h-[70px] flex justify-center select-none'>
			<SignedOut>
				<Link
					href='/user/sign-in'
					className='flex items-center gap-2 hover:bg-blue-100 rounded-sm p-1 h-full transition-colors'
				>
					<UserCircle2 strokeWidth={1} className='size-10 text-gray-700' />
					<div className='flex flex-col'>
						<div className='text-lg font-medium'>Register or Sign in</div>
						<div className='text-sm -mt-1'>to access all features</div>
					</div>
				</Link>
			</SignedOut>
			<SignedIn>
				<div className='flex items-center gap-2 hover:bg-blue-100 rounded-sm p-1 transition-colors'>
					<div className='size-10 rounded-full overflow-hidden'>
						<Image src={user?.imageUrl || ''} alt={user?.username || user?.fullName || ''} width={40} height={40} />
					</div>
					<div className='flex flex-col'>
						<div className='text-lg font-medium'>{user?.username || user?.fullName}</div>
						<div className='text-sm -mt-1'>{user?.emailAddresses[0].emailAddress}</div>
					</div>
				</div>
			</SignedIn>
		</SidebarFooterShadcn>
	);
};
