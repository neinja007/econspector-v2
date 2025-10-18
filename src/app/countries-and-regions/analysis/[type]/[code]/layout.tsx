import type { Metadata } from 'next';
import { getCountry } from '@/api/countries';
import { getRegion } from '@/api/regions';
import { getSubregion } from '@/api/subregions';
import { sloganNotCapitalized } from '@/data/slogan';

type LayoutProps = { children: React.ReactNode };

type Params = { type: 'country' | 'region' | 'subregion'; code: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
	const { type, code } = await params;

	let name = code;
	if (type === 'country') {
		const country = await getCountry(code);
		name = country
			? country.full_name === country.name
				? country.full_name
				: `${country.full_name} (${country.name})`
			: code;
	} else if (type === 'region') {
		const region = await getRegion(code);
		name = region ? region.name : code;
	} else {
		const subregion = await getSubregion(code);
		name = subregion ? subregion.name : code;
	}

	return {
		title: `${name} - ${type.charAt(0).toUpperCase() + type.slice(1)} Analysis - EconSpector`,
		description: `A full, detailed economic analysis of ${name} by EconSpector, ${sloganNotCapitalized}`
	};
}

const Layout = ({ children }: LayoutProps) => children;

export default Layout;
