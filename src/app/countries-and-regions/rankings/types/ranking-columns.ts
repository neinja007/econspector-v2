'use client';

import { RankedItem } from '@/types/ranked-item';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<RankedItem>[] = [
	{
		accessorKey: 'rank',
		header: 'Rank',
	},
	{
		accessorKey: 'score',
		header: 'Value',
	},
	{
		accessorKey: 'item',
		header(props) {
			const firstRowType = props.table.getRowModel().rows[0]?.original.item.type;
			return (firstRowType ? firstRowType.charAt(0).toUpperCase() + firstRowType.slice(1) : '') + ' Information';
		},
	},
	{
		accessorKey: 'coverage',
		header: 'Data Coverage',
	},
];
