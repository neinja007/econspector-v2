export const pathMatches = (path: string, route: string, exact: boolean = false) => {
	if (exact) {
		return path === route;
	} else {
		return path.startsWith(route + '/') || path === route;
	}
};
