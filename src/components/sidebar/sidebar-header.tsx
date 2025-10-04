import { SidebarHeader as SidebarHeaderShadcn } from '@/components/shadcn/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';

export const SidebarHeader = () => {
	return (
		<SidebarHeaderShadcn className='w-full border-b'>
			<div className='flex w-full gap-2 items-center justify-center py-1'>
				<Image src='/favicon.ico' alt='EconSpector' width={40} height={40} />{' '}
				<div className='flex flex-col'>
					<div className='flex items-baseline justify-between gap-1'>
						<span className='text-2xl font-medium'>EconSpector</span>
						<span className='font-bold text-gray-500'>v2</span>
					</div>
					<div className='text-sm -mt-1'>
						Developed by{' '}
						<Link href='https://neinja.dev' target='_blank' className='text-blue-500 underline'>
							neinja.dev
						</Link>
					</div>
				</div>
			</div>
		</SidebarHeaderShadcn>
	);
};
