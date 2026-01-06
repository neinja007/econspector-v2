import { sidebarRoutes } from '@/data/sidebar-routes';
import { useCountries } from '@/hooks/react-query/queries/use-countries';
import { useCountryGroups } from '@/hooks/react-query/queries/use-country-groups';
import { Book, Landmark, LucideIcon } from 'lucide-react';
import { createElement } from 'react';
import FlagComponent from '@/components/flag';

export type SearchItem = {
	label: { label: string; icon?: React.ReactNode | LucideIcon }[];
	href: string;
	display: 'heading-breadcrumbs' | 'breadcrumbs' | 'simple';
	aliases?: (string | null)[];
};

export type SearchGroup = {
	label: string;
	icon?: React.ReactNode | LucideIcon;
	items: SearchItem[];
};

export const useSearchItems = () => {
	const searchGroups: SearchGroup[] = [];

	// Sidebar routes & pages
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

	// Countries & Groups

	const { data: countries } = useCountries();
	const { data: countryGroups } = useCountryGroups();

	const countryItems: SearchItem[] = countries
		? countries.map((country) => ({
				label: [
					{ label: 'Countries', icon: Landmark },
					{
						label: country.name,
						icon: createElement(FlagComponent, { code: country?.cca3 || '', ratio: '4x3', width: 32 })
					}
				],
				href: `/countries/analysis/country/${country.cca3}`,
				display: 'breadcrumbs' as const,
				aliases: [country.full_name, country.cca2, country.ccn3, country.cioc]
		  }))
		: [];

	if (countryItems.length > 0) {
		searchGroups.push({
			label: 'Countries',
			icon: Landmark,
			items: countryItems
		});
	}

	console.log(searchGroups);
	return searchGroups;
};
