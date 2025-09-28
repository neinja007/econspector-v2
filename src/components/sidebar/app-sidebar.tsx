import {
	ArrowLeftRight,
	BarChart,
	Book,
	Brain,
	Database,
	DollarSign,
	Globe2,
	Lightbulb,
	MessageSquare,
	Scale,
	SquareSigma,
	Table,
	TableCellsSplit
} from 'lucide-react';
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

const AppSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>States & Countries</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<TableCellsSplit /> Country Analysis
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Globe2 /> World Map
								</SidebarMenuButton>
								<SidebarMenuButton>
									<BarChart /> Rankings
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Scale /> Comparison
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Currencies</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<DollarSign /> Currency Analysis
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Globe2 /> World Map
								</SidebarMenuButton>
								<SidebarMenuButton>
									<BarChart /> Rankings
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Scale /> Comparison
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Global Analysis</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Globe2 /> Global Analysis
								</SidebarMenuButton>
								<SidebarMenuButton>
									<ArrowLeftRight /> Correlations
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Advanced Analysis</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<SquareSigma /> Custom Scores
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Database /> Indicators
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Table /> Data Explorer
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Brain /> EconSpector AI
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Help & Support</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Lightbulb /> Handbook
								</SidebarMenuButton>
								<SidebarMenuButton>
									<Book /> Glossary
								</SidebarMenuButton>
								<SidebarMenuButton>
									<MessageSquare /> Support
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default AppSidebar;
