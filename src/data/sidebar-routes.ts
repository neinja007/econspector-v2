import {
	ArrowLeftRight,
	BarChart,
	BookText,
	Brain,
	Database,
	DollarSign,
	Flag,
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
		name: 'Countries & Regions',
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
