type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
	return <div className='flex mt-32 items-center justify-center p-6 md:p-10 w-full'>{children}</div>;
};

export default Layout;
