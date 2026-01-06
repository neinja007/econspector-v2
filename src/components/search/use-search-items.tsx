import { sidebarRoutes } from '@/data/sidebar-routes';
import { Book, LucideIcon } from 'lucide-react';

export type SearchItem = {
	label: { label: string; icon?: React.ReactNode | LucideIcon }[];
	href: string;
	display: 'heading-breadcrumbs' | 'breadcrumbs' | 'simple';
};

export type SearchGroup = {
	label: string;
	icon?: React.ReactNode | LucideIcon;
	items: SearchItem[];
};

export const useSearchItems = () => {
	const searchGroups: SearchGroup[] = [];
	const sidebarRouteItems = sidebarRoutes
		.filter((route) => route.name !== 'Authentication')
		.reduce((acc: SearchItem[], route) => {
			acc.push(
				...route.routes.map((r) => ({
					label: [
						{ label: route.name, icon: route.icon },
						{ label: r.label, icon: r.icon }
					],
					href: r.href,
					display: 'breadcrumbs' as const
				}))
			);
			return acc;
		}, [] as SearchItem[]);

	searchGroups.push({
		label: 'Pages',
		icon: Book,
		items: sidebarRouteItems
	});

	console.log(searchGroups);
	return searchGroups;
};
