import { useIndicators } from '@/hooks/react-query/queries/use-indicators';
import { Combobox } from './shadcn-combobox';

interface IndicatorSelectionProps {
	selectedIndicatorId: string;
	setSelectedIndicatorId: React.Dispatch<React.SetStateAction<string>>;
}

export const IndicatorSelection = ({ selectedIndicatorId, setSelectedIndicatorId }: IndicatorSelectionProps) => {
	const { data: indicators } = useIndicators();

	return (
		<Combobox
			options={indicators?.map((indicator) => ({ value: indicator.id.toString(), label: indicator.name })) || []}
			selectedValue={selectedIndicatorId}
			onValueChange={setSelectedIndicatorId}
			fuseKeys={['label']}
			placeholder='Select an indicator'
		/>
	);
};
