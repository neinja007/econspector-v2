import Image from 'next/image';

const Flag = ({ code, ratio }: { code: string; ratio: '1x1' | '4x3' }) => {
	return <Image src={`flags/${ratio}/${code}.svg`} alt='flag' width={50} height={9} />;
};

export default Flag;
