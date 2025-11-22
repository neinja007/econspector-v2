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
import { Home } from 'lucide-react';
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
									<Home /> Welcome to EconSpector
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				{sidebarRoutes
					.filter((group) => !group.hidden)
					.map((group) => (
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
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default AppSidebar;
