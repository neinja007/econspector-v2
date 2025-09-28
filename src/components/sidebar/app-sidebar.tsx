import Link from 'next/link';
import {
	Sidebar,
	SidebarGroup,
	SidebarContent,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton
} from '../shadcn/ui/sidebar';
import { sidebarRoutes } from '@/data/sidebar-routes';
import { Home, LogOut, Settings } from 'lucide-react';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import { SidebarHeader } from './sidebar-header';
import { SidebarFooter } from './sidebar-footer';

const AppSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader />
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
				{
					<SignedIn>
						<SidebarGroup>
							<SidebarGroupLabel>Account</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<Link href='/user/account'>
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
					</SignedIn>
				}
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default AppSidebar;
