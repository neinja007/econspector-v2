import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/theming/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
	title: 'EconSpector v2',
	description: 'The premier platform for visualizing, analyzing, and presenting economic data.'
};

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className='antialiased'>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
};

export default RootLayout;
