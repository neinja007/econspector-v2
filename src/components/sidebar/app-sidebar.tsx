import Link from 'next/link';
import Image from 'next/image';
import {
	Sidebar,
	SidebarGroup,
	SidebarContent,
	SidebarHeader,
	SidebarFooter,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton
} from '../shadcn/ui/sidebar';
import { sidebarRoutes } from '@/data/sidebar-routes';
import { Home, LogOut, Settings, UserCircle2 } from 'lucide-react';
import { SignedOut, SignOutButton } from '@clerk/nextjs';

const AppSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader className='w-full border-b'>
				<div className='flex w-full gap-2 items-center justify-center p-1'>
					<Image src='/favicon.ico' alt='EconSpector' width={40} height={40} />{' '}
					<div className='flex flex-col'>
						<div className='flex items-baseline justify-between gap-1'>
							<span className='text-2xl font-medium'>EconSpector</span>
							<span className='font-bold text-gray-500'>v2</span>
						</div>
						<div className='text-sm -mt-1'>
							Developed by{' '}
							<Link href='https://neinja.dev' target='_blank' className='text-blue-500 underline'>
								neinja.dev
							</Link>
						</div>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href='/'>
									<Home /> Welcome!
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				{sidebarRoutes.map((group) => (
					<SidebarGroup key={group.name}>
						<SidebarGroupLabel>{group.name}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.routes.map((r) => (
									<SidebarMenuItem key={r.label}>
										<SidebarMenuButton asChild>
											<Link href={r.href}>
												<r.icon /> {r.label}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
				<SidebarGroup>
					<SidebarGroupLabel>Account</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href='/account'>
										<Settings /> Manage Account
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<SignOutButton>
										<button className='cursor-pointer'>
											<LogOut /> Log Out
										</button>
									</SignOutButton>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='w-full border-t p-3'>
				<SignedOut>
					<div className='flex items-center gap-2'>
						<UserCircle2 strokeWidth={1} className='size-10' />
						<div className='flex flex-col'>
							<div className='text-lg font-medium'>Register or Sign in</div>
							<div className='text-sm -mt-1'>To access all features</div>
						</div>
					</div>
				</SignedOut>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
