'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils/shadcn/utils';
import { Button } from '@/components/shadcn/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import useSearch from '@/hooks/use-search';

export function Combobox({
	options,
	selectedValue,
	onValueChange,
	fuseKeys,
	placeholder
}: {
	options: { value: string; label: string }[];
	selectedValue: string;
	onValueChange: React.Dispatch<React.SetStateAction<string>>;
	fuseKeys: string[];
	placeholder: string;
}) {
	const [open, setOpen] = React.useState(false);
	const [query, setQuery] = React.useState('');

	const results = useSearch(options, query, fuseKeys);
	console.log(results);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
					{selectedValue ? options.find((option) => option.value === selectedValue)?.label : placeholder}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command shouldFilter={false}>
					<CommandInput placeholder={placeholder} className='h-9' value={query} onValueChange={setQuery} />
					<CommandList>
						{results.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
						<CommandGroup>
							{results.map((result) => (
								<CommandItem
									key={result.value}
									value={result.value}
									onSelect={(currentValue) => {
										onValueChange(currentValue);
										setOpen(false);
									}}
								>
									{result.label}
									<Check className={cn('ml-auto', selectedValue === result.value ? 'opacity-100' : 'opacity-0')} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
