'use client';

import { SparklesCore } from '@/components/aceternity/sparkles';
import { useTheme } from 'next-themes';

export default function Home() {
	const { resolvedTheme } = useTheme();

	return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='md:text-7xl text-3xl lg:text-9xl font-bold text-center relative z-20'>EconSpector v2</h1>
			<div className='w-full h-40 relative'>
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />

				<SparklesCore
					background='transparent'
					minSize={0.7}
					maxSize={1}
					particleDensity={1200}
					className='w-full h-full'
					particleColor={resolvedTheme === 'dark' ? '#FFFFFF' : '#007777'}
				/>

				<div className='absolute inset-0 h-full bg-background mx-auto [mask-image:radial-gradient(450px_200px_at_top,transparent_20%,white)]'></div>
			</div>
		</div>
	);
}
