import { Button } from '@/components/shadcn/ui/button';
import { DbDataTables } from '@/types/db/alias';
import Link from 'next/link';

export const Currencies = ({ data }: { data: DbDataTables<'currencies'>[] }) => {
	return (
		<div className='flex flex-col gap-1 items-baseline text-muted-foreground'>
			<span className='text-sm'>{data.length > 1 ? 'Currencies' : 'Currency'}:</span>
			<div className='flex gap-2'>
				{data.map((currency) => (
					<Button key={currency.code} variant='outline' size='sm' asChild>
						<Link
							key={currency.code}
							className='flex items-center gap-1 transition-colors hover:text-blue-500'
							href={`/currencies/analysis/${currency.code}`}
						>
							{currency.symbol_native} {currency.name}
						</Link>
					</Button>
				))}
			</div>
		</div>
	);
};
