import { Button } from '@/components/shadcn/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { LucideIcon, Search } from 'lucide-react';
import Link from 'next/link';

type DatasetCardProps = {
	name: string;
	description: string;
	icon: LucideIcon;
	slug: string;
};

const DatasetCard = ({ name, description, icon: Icon, slug }: DatasetCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Icon className='size-5' /> {name}
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Link href={`/advanced/data-explorer/${slug}`} className='w-full'>
					<Button className='w-full'>
						<Search /> Explore this dataset
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default DatasetCard;
