import { LucideIcon } from 'lucide-react';
import { ComponentProps, createElement, isValidElement } from 'react';

type BreadcrumbIcon = LucideIcon | React.ReactNode;

const renderIconOrComponent = ({ icon, props }: { icon?: BreadcrumbIcon; props?: ComponentProps<LucideIcon> }) => {
	if (!icon) return null;

	if (isValidElement(icon)) return icon;

	return createElement(icon as LucideIcon, { ...props });
};

export { renderIconOrComponent };
