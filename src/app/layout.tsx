import type { Metadata } from 'next';
import './globals.css';

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
			<body className='antialiased'>{children}</body>
		</html>
	);
}
