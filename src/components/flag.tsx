import Image from 'next/image';

type FlagProps = {
	code: string;
	ratio: '1x1' | '4x3';
	height: number;
};

const Flag = ({ code, ratio, height }: FlagProps) => {
	const width = ratio === '1x1' ? height : (height * 4) / 3;

	return <Image src={`flags/${ratio}/${code}.svg`} alt='flag' width={width} height={height} />;
};

export default Flag;
