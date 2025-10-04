import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/theming/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { SidebarProvider } from '@/components/shadcn/ui/sidebar';
import AppSidebar from '@/components/sidebar/app-sidebar';
import { TanstackQueryProvider } from '@/components/tanstack-query-provider';
import { Analytics } from '@vercel/analytics/next';
import { HeadingBreadcrumbs } from '@/components/heading-breadcrumbs';
import ThemeToggle from '@/components/theming/theme-toggle';
import { shadcn } from '@clerk/themes';

export const metadata: Metadata = {
	title: 'EconSpector v2',
	description: 'The premier platform for visualizing, analyzing, and presenting economic data.'
};

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: shadcn,
				layout: {
					helpPageUrl: '/support/handbook',
					logoImageUrl: '/favicon.ico'
				},
				variables: {
					colorPrimary: 'var(--primary)',
					borderRadius: 'var(--radius)'
				}
			}}
		>
			<html lang='en'>
				<body className='antialiased'>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
						<TanstackQueryProvider>
							<SidebarProvider>
								<AppSidebar />
								<main className='w-full h-screen'>
									<div className='flex items-center justify-between p-6'>
										<HeadingBreadcrumbs />
										<div>
											<ThemeToggle />
										</div>
									</div>
									<div className='m-6 h-auto w-full max-w-7xl mx-auto'>{children}</div>
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
