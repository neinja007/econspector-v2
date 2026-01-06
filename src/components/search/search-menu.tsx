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
import { EyeOffIcon, SearchIcon } from 'lucide-react';
import { Checkbox } from '../shadcn/ui/checkbox';
import { Label } from '../shadcn/ui/label';

export function SearchMenu() {
	const [open, setOpen] = useState(false);
	const searchGroups = useSearchItems();
	const router = useRouter();
	const [showGroups, setShowGroups] = useState<string[]>([]);

	const handleToggleGroup = (group: string) => {
		if (showGroups.includes(group)) {
			setShowGroups((prev) => prev.filter((g) => g !== group));
		} else {
			setShowGroups((prev) => [...prev, group]);
		}
	};

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

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			trigger={
				// TODO: Tooltip for some reason breaks the dialog trigger, figure that out
				// <SimpleTooltip tooltip='Search through everything EconSpector has to offer' asChild>
				<Button variant='outline' size='icon'>
					<SearchIcon className='size-4' />
				</Button>
				// </SimpleTooltip>
			}
		>
			<CommandInput
				placeholder={`Search for ${
					showGroups.length > 0 ? showGroups.join(', ').toLowerCase() + ', and more' : 'something'
				}...`}
			/>
			<div className='text-sm text-muted-foreground py-2 px-4 flex items-center justify-between gap-2'>
				<span>Show results for:</span>
				<div className='flex items-center gap-4 flex-wrap'>
					{searchGroups.map((group) => (
						<Label
							htmlFor={`show-${group.label}`}
							key={group.label}
							className='text-sm flex items-center gap-1 cursor-pointer'
						>
							{group.icon && renderIconOrComponent({ icon: group.icon, props: { className: 'size-3' } })} {group.label}
							<Checkbox
								id={`show-${group.label}`}
								checked={showGroups.includes(group.label)}
								onCheckedChange={() => handleToggleGroup(group.label)}
							/>
						</Label>
					))}
				</div>
			</div>
			<hr />
			<CommandList>
				<CommandEmpty>
					{showGroups.length > 0
						? 'No results found. Report a missing solution or feature request:'
						: 'No results found. Select some groups to show results for.'}
				</CommandEmpty>
				{searchGroups
					.filter((group) => showGroups.includes(group.label))
					.map((group) => (
						<CommandGroup
							heading={
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-1'>
										{group.icon && renderIconOrComponent({ icon: group.icon, props: { className: 'size-3' } })}{' '}
										{group.label}
									</div>
									<button
										onClick={() => handleToggleGroup(group.label)}
										className='flex items-center gap-1 hover:underline'
									>
										<EyeOffIcon className='size-3' /> Hide results for this group
									</button>
								</div>
							}
							key={group.label}
						>
							{group.items.map((item) => (
								<CommandItem
									onSelect={() => handleSelect(item)}
									key={item.label.map((l) => l.label).join(' - ')}
									keywords={item.label
										.map((l) => l.label)
										.concat(item.aliases?.filter((a) => a !== null) || [])
										.concat([item.href])}
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
