import {
	ArrowLeftRight,
	BarChart,
	BookText,
	Brain,
	Database,
	DollarSign,
	Flag,
	Globe2,
	Landmark,
	Lightbulb,
	LucideIcon,
	MapIcon,
	MessagesSquare,
	Scale,
	SquareSigma,
	Table
} from 'lucide-react';

export const sidebarRoutes: {
	name: string;
	routes: {
		label: string;
		href: string;
		icon: LucideIcon;
	}[];
}[] = [
	{
		name: 'Countries',
		routes: [
			{
				label: 'Country Analysis',
				href: '/countries/analysis',
				icon: Landmark
			},
			{
				label: 'Country Rankings',
				href: '/countries/rankings',
				icon: BarChart
			},
			{
				label: 'Country Comparison',
				href: '/countries/comparison',
				icon: Scale
			}
		]
	},
	{
		name: 'Currencies',
		routes: [
			{
				label: 'Currency Analysis',
				href: '/currencies/analysis',
				icon: DollarSign
			},
			{
				label: 'Currency Rankings',
				href: '/currencies/rankings',
				icon: BarChart
			},
			{
				label: 'Currency Comparison',
				href: '/currencies/comparison',
				icon: Scale
			}
		]
	},
	{
		name: 'International Economy',
		routes: [
			{
				label: 'World Map',
				href: '/international/world-map',
				icon: MapIcon
			},
			{
				label: 'Global Aggregates',
				href: '/international/global-aggregates',
				icon: Globe2
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
	}
];
