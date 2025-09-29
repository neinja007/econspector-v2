import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/theming/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { SidebarProvider } from '@/components/shadcn/ui/sidebar';
import AppSidebar from '@/components/sidebar/app-sidebar';
import { TanstackQueryProvider } from '@/components/tanstack-query-provider';
import { Analytics } from '@vercel/analytics/next';
import { HeadingBreadcrumbs } from '@/components/heading-breadcrumbs';

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
						<TanstackQueryProvider>
							<SidebarProvider>
								<AppSidebar />
								<main className='w-full h-screen'>
									<div className='flex items-center p-6'>
										<HeadingBreadcrumbs />
									</div>
									<div className='p-6 h-auto'>{children}</div>
								</main>
							</SidebarProvider>
						</TanstackQueryProvider>
					</ThemeProvider>
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
};

export default RootLayout;
