'use client';

import { RankedItem } from '@/types/ranked-item';
import { ColumnDef } from '@tanstack/react-table';
import Flag from '@/components/flag';

export const columns: ColumnDef<RankedItem>[] = [
	{
		accessorKey: 'rank',
		header: 'Rank',
		cell: ({ row }) => {
			return <div className='ml-1'>{row.original.rank}.</div>;
		},
	},
	{
		accessorKey: 'score',
		header: 'Value',
		cell: ({ row }) => {
			return <div>{row.original.score.toFixed(2)}</div>;
		},
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
					{row.original.item.fullName}
				</div>
			);
		},
	},
	{
		accessorKey: 'coverage',
		header: 'Data Coverage',
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					{row.original.coverage.map((coverage) =>
						coverage.code === 'temporal' ? (
							coverage.coverage.map((coverageDataPoint) => (
								<div
									className='size-4 border border-r-white last-of-type:border-r-transparent'
									key={coverageDataPoint.code}
									style={{ backgroundColor: coverageDataPoint.covered ? 'green' : 'red' }}
								></div>
							))
						) : (
							<div key={coverage.code}>{coverage.label}</div>
						)
					)}
				</div>
			);
		},
	},
];
