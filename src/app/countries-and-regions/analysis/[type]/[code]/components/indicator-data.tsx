import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { FrequencyEnum } from '@/types/frequency';
import { Indicator } from '@/types/indicator';
import { useState } from 'react';

type IndicatorDataProps = {
	indicator: Indicator;
};

export const IndicatorData = ({ indicator }: IndicatorDataProps) => {
	const hasChildren = indicator.children.length > 0;
	const [selectedChildId, setSelectedChildId] = useState<number | null>(indicator.children[0]?.id ?? null);
	const [selectedFrequency, setSelectedFrequency] = useState<FrequencyEnum | null>(
		hasChildren
			? indicator.children[0]?.indicator_frequencies[0]?.frequency ?? null
			: indicator.indicator_frequencies[0]?.frequency ?? null
	);

	const availableFrequencies = hasChildren
		? indicator.children.find((child) => child.id === selectedChildId)?.indicator_frequencies
		: indicator.indicator_frequencies;

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					{indicator.name}{' '}
					{hasChildren && (
						<Select
							value={selectedChildId?.toString() ?? undefined}
							onValueChange={(value) => setSelectedChildId(Number(value))}
						>
							<SelectTrigger className='w-fit' size='sm'>
								<SelectValue />
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
					<Select
						value={selectedFrequency?.toString() ?? undefined}
						onValueChange={(value) => setSelectedFrequency(value as FrequencyEnum)}
						disabled={(!selectedChildId && hasChildren) || availableFrequencies?.length === 1}
					>
						<SelectTrigger className='w-fit' size='sm'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{availableFrequencies?.map((frequency) => (
								<SelectItem key={frequency.frequency} value={frequency.frequency}>
									{frequency.frequency}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardTitle>
			</CardHeader>
			<CardContent>Data</CardContent>
		</Card>
	);
};
