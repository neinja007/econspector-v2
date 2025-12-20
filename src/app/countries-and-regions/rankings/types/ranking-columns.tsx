'use client';

import { RankedItem } from '@/types/ranked-item';
import { ColumnDef } from '@tanstack/react-table';
import Flag from '@/components/flag';
import Link from 'next/link';
import { SimpleTooltip } from '@/components/simple-tooltip';

export const columns = (unit: string): ColumnDef<RankedItem>[] => [
	{
		accessorKey: 'rank',
		header: 'Rank',
		cell: ({ row }) => {
			return <div className='ml-1'>{row.original.rank}.</div>;
		}
	},
	{
		accessorKey: 'score',
		header: unit ? `Value (${unit})` : 'Value',
		cell: ({ row, table }) => {
			return (
				<div
					className='relative bg-blue-500 rounded-sm max-w-full h-6 flex items-center'
					style={{
						width: `${(row.original.score / (table.getRowModel().rows[0]?.original.score || 1)) * 100}%`,
						maxWidth: '100%',
						minWidth: '8px'
					}}
				>
					<span
						className='absolute left-0 whitespace-nowrap text-white px-1'
						style={{ top: '50%', transform: 'translateY(-50%)' }}
					>
						{row.original.score !== undefined && row.original.score !== null
							? row.original.score.toLocaleString(undefined, {
									maximumFractionDigits: 2,
									notation: 'compact'
							  })
							: ''}
						{unit ? ` ${unit}` : null}
					</span>
				</div>
			);
		},
		enableSorting: true
	},
	{
		accessorKey: 'item',
		header(props) {
			const firstRowType = props.table.getRowModel().rows[0]?.original.item.type;
			return (firstRowType ? firstRowType.charAt(0).toUpperCase() + firstRowType.slice(1) : '') + ' Information';
		},
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-2'>
					<Flag code={row.original.item.iconPath || ''} ratio='4x3' height={24} />
					<SimpleTooltip tooltip={row.original.item.fullName}>
						<Link
							href={`/countries-and-regions/analysis/${row.original.item.type}/${row.original.item.code}`}
							className='hover:underline'
						>
							{row.original.item.name}
						</Link>
					</SimpleTooltip>
				</div>
			);
		}
	},
	{
		accessorKey: 'coverage',
		header: 'Data Coverage',
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>{row.original.coverage.map((coverage) => coverage.code).join(', ')}</div>
			);
		}
	}
];
