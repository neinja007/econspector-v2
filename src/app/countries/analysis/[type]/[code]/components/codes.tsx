import { SimpleTooltip } from '@/components/simple-tooltip';
import { DbDataViews } from '@/types/db/alias';
import { CountryGroup } from '@/types/db/types/country-group';
import Link from 'next/link';

export const Codes = ({
	keys,
	data
}: {
	keys: string[];
	data: DbDataViews<'countries_with_currencies'> | CountryGroup;
}) => {
	const codesString = keys
		.map((key) => (key in data ? data[key as keyof typeof data] : undefined))
		.filter(Boolean)
		.map((code, i) => (
			<div key={keys[i].toLowerCase() + '-' + code}>
				<SimpleTooltip
					tooltip={
						<span>
							This is the {keys[i].toUpperCase()} code.{' '}
							<Link className='text-blue-500 hover:underline' href={`/support/glossary#${keys[i]}`}>
								More info
							</Link>
						</span>
					}
				>
					{code}
				</SimpleTooltip>
			</div>
		))
		.reduce(
			(acc, curr, i) => [
				...acc,
				i !== 0 && (
					<span key={i} className='text-sm'>
						|
					</span>
				),
				curr
			],
			[] as React.ReactNode[]
		);

	return <span className='text-sm flex gap-1'>{codesString}</span>;
};
