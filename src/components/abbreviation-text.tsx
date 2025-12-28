import { abbreviations } from '@/data/abbreviations';
import { SimpleTooltip } from './simple-tooltip';
import Link from 'next/link';

export const AbbreviationText = ({ text, cursorPointer = false }: { text: string; cursorPointer?: boolean }) => {
	const parts = text.split(' ');

	const partsWithAbbreviations = parts.map((part, index) => {
		if (abbreviations[part.toLowerCase()]) {
			return (
				<SimpleTooltip
					key={index}
					asChild={true}
					cursorPointer={cursorPointer}
					tooltip={
						<span className='truncate max-w-[200px]'>
							{abbreviations[part.toLowerCase()].short}{' '}
							<Link
								className='text-blue-500 hover:underline'
								href={`/support/documentation?tab=glossary&section=${part.toLowerCase()}`}
							>
								More info
							</Link>
						</span>
					}
				>
					{part}
				</SimpleTooltip>
			);
		}
		return <span key={index}>{part}</span>;
	});

	return <span className='inline-flex gap-1 items-center min-w-0 max-w-full'>{partsWithAbbreviations}</span>;
};
