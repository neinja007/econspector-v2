import { datasets } from '@/app/advanced/data-explorer/data/datasets';
import {
	ArrowLeftRight,
	BarChart,
	BookOpen,
	BookText,
	Brain,
	ChartNoAxesCombined,
	Database,
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
	Settings,
	SquareSigma,
	Table,
	User
} from 'lucide-react';

export const sidebarRoutes: {
	name: string;
	hidden?: boolean;
	icon: LucideIcon;
	routes: {
		label: string;
		href: string;
		icon: LucideIcon;
		getBreadcrumbs?: (pathname: string) =>
			| {
					label: string;
					href?: string;
					icon?: LucideIcon;
			  }[]
			| undefined;
	}[];
}[] = [
	{
		name: 'Countries & Regions',
		icon: Landmark,
		routes: [
			{
				label: 'Analysis',
				href: '/countries-and-regions/analysis',
				icon: Landmark
			},
			{
				label: 'Rankings',
				href: '/countries-and-regions/rankings',
				icon: BarChart
			},
			{
				label: 'Comparison',
				href: '/countries-and-regions/comparison',
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
				icon: DollarSign
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
			{
				label: 'Indicators',
				href: '/advanced/indicators',
				icon: Database
			},
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
				label: 'Handbook',
				href: '/support/handbook',
				icon: BookOpen
			},
			{
				label: 'Glossary',
				href: '/support/glossary',
				icon: BookText
			},
			{
				label: 'Help',
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
		name: 'Account',
		icon: User,
		hidden: true,
		routes: [
			{
				label: 'Manage Account',
				href: '/user/account',
				icon: Settings
			},
			{
				label: 'Sign In or Register',
				href: '/user/sign-in',
				icon: LogIn
			}
		]
	},
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
	}
];
