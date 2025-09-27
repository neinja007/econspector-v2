import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theming/theme-provider';

export const metadata: Metadata = {
	title: 'EconSpector v2',
	description: 'The premier platform for visualizing, analyzing, and presenting economic data.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='antialiased'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
