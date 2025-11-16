import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './shadcn/ui/tooltip';
import { cn } from '@/utils/shadcn/utils';

export const SimpleTooltip = ({
	children,
	tooltip,
	asChild = false,
	cursorPointer = false
}: {
	children: React.ReactNode;
	tooltip: React.ReactNode;
	asChild?: boolean;
	cursorPointer?: boolean;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Tooltip open={open} onOpenChange={setOpen}>
			<TooltipTrigger asChild={asChild}>
				<span
					className={cn(
						'border-b border-gray-500',
						cursorPointer ? 'cursor-pointer' : 'cursor-default',
						open ? 'border-solid' : 'border-dotted'
					)}
				>
					{children}
				</span>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
};
