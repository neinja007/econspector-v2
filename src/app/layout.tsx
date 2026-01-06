import './globals.css';
import ThemeProvider from '@/components/theming/theme-provider';
import { SidebarProvider } from '@/components/shadcn/ui/sidebar';
import AppSidebar from '@/components/sidebar/app-sidebar';
import { TanstackQueryProvider } from '@/components/tanstack-query-provider';
import { Analytics } from '@vercel/analytics/next';
import { HeadingBreadcrumbs } from '@/components/heading-breadcrumbs';
import ThemeToggle from '@/components/theming/theme-toggle';
import { generateGlobalMetadata } from '@/utils/generate-global-metadata';
import { SearchMenu } from '@/components/search/search-menu';
import { AuthButton } from '@/components/auth-button';

export const generateMetadata = generateGlobalMetadata;

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang='en'>
			<body className='antialiased'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<TanstackQueryProvider>
						<SidebarProvider>
							<AppSidebar />
							<main className='w-full h-screen'>
								<div className='flex items-center justify-between p-6'>
									<HeadingBreadcrumbs />
									<div className='flex items-center gap-2'>
										<SearchMenu />
										<ThemeToggle />
										<AuthButton />
									</div>
								</div>
								<div className='m-6 h-auto w-full max-w-7xl mx-auto px-4'>{children}</div>
							</main>
						</SidebarProvider>
					</TanstackQueryProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;
