import { AbbreviationText } from '@/components/abbreviation-text';
import { CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/shadcn/ui/select';
import { SimpleTooltip } from '@/components/simple-tooltip';
import { Indicator } from '@/types/indicator';

type IndicatorCardHeaderProps = {
	indicator: Indicator;
	hasChildren: boolean;
	selectedChildId: number | null;
	setSelectedChildId: (id: number | null) => void;
	selectedIndicator: Indicator;
	children: React.ReactNode;
};

export const IndicatorCardHeader = ({
	indicator,
	hasChildren,
	selectedChildId,
	setSelectedChildId,
	selectedIndicator,
	children
}: IndicatorCardHeaderProps) => {
	return (
		<CardHeader>
			<CardTitle className='flex items-center gap-2 min-h-8'>
				<div className='max-w-[200px] line-clamp-1 leading-5'>
					{indicator.description ? (
						<SimpleTooltip tooltip={indicator.description}>{indicator.name}</SimpleTooltip>
					) : (
						indicator.name
					)}
				</div>
				{hasChildren && (
					<Select
						value={selectedChildId?.toString() ?? undefined}
						onValueChange={(value) => setSelectedChildId(Number(value))}
					>
						<SelectTrigger className='w-fit' size='sm'>
							<AbbreviationText text={selectedIndicator?.name} cursorPointer={true} />
						</SelectTrigger>
						<SelectContent>
							{indicator.children.map((child) => (
								<SelectItem key={child.id} value={child.id.toString()}>
									{child.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
				{children}
			</CardTitle>
		</CardHeader>
	);
};
