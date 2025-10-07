import { Currency } from '@/types/currency';

export const Currencies = ({ data }: { data: Currency[] }) => {
	return <div>{data.map((currency) => currency.name + ' (' + currency.symbol_native + ')').join(', ')}</div>;
};
