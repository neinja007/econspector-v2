'use client';

import { useEffect, useState } from 'react';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '../shadcn/ui/command';
import { SearchItem, useSearchItems } from './use-search-items';
import { HeadingBreadcrumbs } from '../heading-breadcrumbs';
import { BreadcrumbJoiner } from './breadcrumb-joiner';
import { useRouter } from 'next/navigation';
import { renderIconOrComponent } from '@/utils/render-icon-or-component';
import { Button } from '../shadcn/ui/button';
import { SearchIcon } from 'lucide-react';

export function SearchMenu() {
	const [open, setOpen] = useState(false);
	const searchGroups = useSearchItems();
	const router = useRouter();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	const handleSelect = (item: SearchItem) => {
		setOpen(false);
		router.push(item.href);
	};

	// TODO Add link to report a missing solution or feature request

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			trigger={
				<Button variant='outline' size='icon'>
					<SearchIcon className='size-4' />
				</Button>
			}
		>
			<CommandInput placeholder='Search for pages, countries, and more...' />
			<CommandList>
				<CommandEmpty>No results found. Report a missing solution or feature request:</CommandEmpty>
				{searchGroups.map((group) => (
					<CommandGroup
						heading={
							<div className='flex items-center gap-1'>
								{group.icon && renderIconOrComponent({ icon: group.icon, props: { className: 'size-3' } })}{' '}
								{group.label}
							</div>
						}
						key={group.label}
					>
						{group.items.map((item) => (
							<CommandItem
								onSelect={() => handleSelect(item)}
								key={item.label.map((l) => l.label).join(' - ')}
								keywords={item.label.map((l) => l.label)}
							>
								{item.display === 'heading-breadcrumbs' ? (
									<HeadingBreadcrumbs overridePathname={item.href} small />
								) : item.display === 'breadcrumbs' ? (
									<BreadcrumbJoiner breadcrumbs={item.label} />
								) : (
									<span>{item.label.join(' - ')}</span>
								)}
							</CommandItem>
						))}
					</CommandGroup>
				))}
			</CommandList>
		</CommandDialog>
	);
}
