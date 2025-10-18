import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Indicator } from '@/types/indicator';

type IndicatorDataProps = {
	indicator: Indicator;
};

export const IndicatorData = ({ indicator }: IndicatorDataProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{indicator.name}</CardTitle>
			</CardHeader>
			<CardContent>Data</CardContent>
		</Card>
	);
};
