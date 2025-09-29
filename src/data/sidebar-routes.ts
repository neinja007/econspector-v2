import {
	ArrowLeftRight,
	BarChart,
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
		getBreadcrumbs?: (pathname: string) => {
			label: string;
			href?: string;
			icon?: LucideIcon;
		}[];
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
		name: 'Help & Support',
		icon: HelpCircle,
		routes: [
			{
				label: 'Handbook',
				href: '/help/handbook',
				icon: Lightbulb
			},
			{
				label: 'Glossary',
				href: '/help/glossary',
				icon: BookText
			},
			{
				label: 'Support & Feedback',
				href: '/help/support-feedback',
				icon: MessagesSquare
			},
			{
				label: 'Report an Issue',
				href: '/help/report-issue',
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
