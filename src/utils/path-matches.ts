export const pathMatches = (path: string, route: string) => {
	return path.startsWith(route + '/') || path === route;
};
