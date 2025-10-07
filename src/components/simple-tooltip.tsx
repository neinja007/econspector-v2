import { Tooltip, TooltipContent, TooltipTrigger } from './shadcn/ui/tooltip';

export const SimpleTooltip = ({ children, tooltip }: { children: React.ReactNode; tooltip: React.ReactNode }) => {
	return (
		<Tooltip>
			<TooltipTrigger>{children}</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
};
