import { SimpleTooltip } from '@/components/simple-tooltip';
import { Country } from '@/types/country';
import { Region } from '@/types/region';
import { Subregion } from '@/types/subregion';
import Link from 'next/link';

export const Codes = ({ keys, data }: { keys: string[]; data: Country | Region | Subregion }) => {
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
