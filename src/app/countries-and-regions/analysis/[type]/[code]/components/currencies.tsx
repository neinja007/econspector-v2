import { Button } from '@/components/shadcn/ui/button';
import { Currency } from '@/types/currency';
import Link from 'next/link';

export const Currencies = ({ data }: { data: Currency[] }) => {
	return (
		<div className='flex flex-col gap-1 items-baseline text-muted-foreground'>
			<span className='text-sm'>{data.length > 1 ? 'Currencies' : 'Currency'}:</span>
			{data.map((currency) => (
				<Button key={currency.currency_code} variant='outline' size='sm' asChild>
					<Link
						key={currency.currency_code}
						className='flex items-center gap-1 transition-colors hover:text-blue-500'
						href={`/currencies/analysis/${currency.currency_code}`}
					>
						{currency.symbol_native} {currency.name}
					</Link>
				</Button>
			))}
		</div>
	);
};
