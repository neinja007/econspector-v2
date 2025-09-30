import { DollarSign, Landmark, LucideIcon } from 'lucide-react';

export type Dataset = {
	name: string;
	description: string;
	icon: LucideIcon;
	slug: string;
};

export const datasets: Dataset[] = [
	{
		name: 'Countries',
		description:
			'This dataset contains information about countries, including their currencies, country codes, region, and a lot more.',
		icon: Landmark,
		slug: 'countries'
	},
	{
		name: 'Currencies',
		description:
			'You can find all the currencies in the world in this dataset. We also offer information about their countries, their codes, their symbols, and a lot more.',
		icon: DollarSign,
		slug: 'currencies'
	}
];
