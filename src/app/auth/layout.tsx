import EconSpectorIcon from '@/components/icon';
import Link from 'next/link';

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className='flex mt-20 text-lg flex-col justify-center w-full max-w-xl mx-auto p-6 md:p-10 gap-6'>
			<div className='w-full flex items-center justify-between'>
				<div className='text-2xl font-bold'>EconSpector v2 Authentication</div>
				<EconSpectorIcon />
			</div>
			<div className='w-full flex items-center justify-center'>{children}</div>
			<div className='text-sm text-muted-foreground text-center'>
				If you need help, please get in touch on our{' '}
				<Link href='/support/help' className='text-blue-500 underline'>
					Help & Contact
				</Link>{' '}
				page.
			</div>
		</div>
	);
};

export default Layout;
