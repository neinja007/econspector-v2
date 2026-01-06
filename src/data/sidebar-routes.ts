import { getCountry } from '@/supabase/api/countries';
import { datasets } from '@/app/advanced/data-explorer/data/datasets';
import FlagComponent from '@/components/flag';
import {
	ArrowLeftRight,
	BarChart,
	BookOpen,
	Brain,
	ChartNoAxesCombined,
	Component,
	DollarSign,
	Flag,
	Globe,
	Globe2,
	HelpCircle,
	Home,
	Landmark,
	Lightbulb,
	LogIn,
	LucideIcon,
	MapIcon,
	MessagesSquare,
	Scale,
	Search,
	SquareSigma,
	Table,
	Lock,
	Check,
	Key,
	AlertCircle,
	User
} from 'lucide-react';
import { createElement, ReactNode } from 'react';
import { getCountryGroup } from '@/supabase/api/country_groups';

export const sidebarRoutes: {
	name: string;
	hidden?: boolean;
	icon: LucideIcon;
	routes: {
		exact?: boolean;
		label: string;
		href: string;
		icon: LucideIcon;
		getBreadcrumbs?: (
			pathname: string,
			short?: boolean
		) =>
			| Promise<
					| {
							label: string;
							href?: string;
							icon?: ReactNode | LucideIcon;
					  }[]
					| undefined
			  >
			| {
					label: string;
					href?: string;
					icon?: ReactNode | LucideIcon;
			  }[]
			| undefined;
	}[];
}[] = [
	{
		name: 'General',
		icon: Globe,
		hidden: true,
		routes: [
			{
				label: 'Welcome to EconSpector v2!',
				href: '/',
				icon: Home
			}
		]
	},
	{
		name: 'Countries',
		icon: Landmark,
		routes: [
			{
				label: 'Analysis',
				href: '/countries/analysis',
				icon: Search,
				getBreadcrumbs: async (pathname) => {
					const type = pathname.split('/')[1] as 'country' | 'group';
					const code = pathname.split('/')[2];
					if (!type || !code) return undefined;
					if (type === 'country') {
						const country = await getCountry(code);
						const label = country ? `${country.full_name} (${country.name})` : 'Unknown Country';
						return [
							{
								label,
								href: `/countries/analysis/${type}/${code}`,
								icon: createElement(FlagComponent, { code: country?.cca3 || '', ratio: '4x3', width: 32 })
							}
						];
					} else if (type === 'group') {
						const group = await getCountryGroup(parseInt(code));
						const label = group ? group.name : 'Unknown Group';
						return [
							{
								label,
								href: `/countries/analysis/${type}/${code}`,
								icon: Component
							}
						];
					} else {
						return undefined;
					}
				}
			},
			{
				label: 'Rankings',
				href: '/countries/rankings',
				icon: BarChart
			},
			{
				label: 'Comparison',
				href: '/countries/comparison',
				icon: Scale
			}
		]
	},
	{
		name: 'Currencies',
		icon: DollarSign,
		routes: [
			{
				label: 'Analysis',
				href: '/currencies/analysis',
				icon: Search
			},
			{
				label: 'Rankings',
				href: '/currencies/rankings',
				icon: BarChart
			},
			{
				label: 'Comparison',
				href: '/currencies/comparison',
				icon: Scale
			}
		]
	},
	{
		name: 'International Economy',
		icon: Globe2,
		routes: [
			{
				label: 'World Map',
				href: '/international/world-map',
				icon: MapIcon
			},
			{
				label: 'Correlations',
				href: '/international/correlations',
				icon: ArrowLeftRight
			}
		]
	},
	{
		name: 'Advanced Analysis',
		icon: ChartNoAxesCombined,
		routes: [
			{
				label: 'Custom Scores',
				href: '/advanced/custom-scores',
				icon: SquareSigma
			},
			// {
			// 	label: 'Indicators',
			// 	href: '/advanced/indicators',
			// 	icon: Database
			// },
			{
				label: 'Data Explorer',
				href: '/advanced/data-explorer',
				getBreadcrumbs: (pathname) => {
					const dataset = datasets.find((dataset) => pathname === '/' + dataset.slug);
					if (!dataset) return undefined;
					return [
						{
							label: dataset.name,
							href: `/advanced/data-explorer/${dataset.slug}`,
							icon: dataset.icon
						}
					];
				},
				icon: Table
			},
			{
				label: 'EconSpector AI',
				href: '/advanced/econspector-ai',
				icon: Brain
			}
		]
	},
	{
		name: 'Support',
		icon: HelpCircle,
		routes: [
			{
				label: 'Documentation',
				href: '/support/documentation',
				icon: BookOpen
			},
			{
				label: 'Help & Contact',
				href: '/support/help',
				icon: MessagesSquare
			},
			{
				label: 'Ideas & Feedback',
				href: '/support/feedback',
				icon: Lightbulb
			},
			{
				label: 'Report a Problem',
				href: '/support/report-issue',
				icon: Flag
			}
		]
	},
	{
		name: 'Authentication',
		icon: Lock,
		hidden: true,
		routes: [
			{
				label: 'Log In to EconSpector',
				href: '/auth/login',
				icon: LogIn
			},
			{
				label: 'Account Management',
				href: '/auth',
				exact: true,
				icon: User
			},
			{
				label: 'Sign Up for EconSpector',
				href: '/auth/sign-up',
				icon: LogIn
			},
			{
				label: 'Signed Up Successfully',
				href: '/auth/sign-up-success',
				icon: Check
			},
			{
				label: 'Forgot Password',
				href: '/auth/forgot-password',
				icon: HelpCircle
			},
			{
				label: 'Update Password',
				href: '/auth/update-password',
				icon: Key
			},
			{
				label: 'Confirm Email',
				href: '/auth/confirm',
				icon: Check
			},
			{
				label: 'An Authentication Error Occurred',
				href: '/auth/error',
				icon: AlertCircle
			}
		]
	}
];
