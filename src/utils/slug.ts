export const slug = (str: string) => {
	return str.toLowerCase().replaceAll(' ', '-');
};
