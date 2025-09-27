import { Sidebar, SidebarGroup, SidebarContent, SidebarHeader, SidebarFooter } from '../shadcn/ui/sidebar';

const AppSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default AppSidebar;
