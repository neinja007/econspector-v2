import { IFuseOptions } from 'fuse.js';

export const fuseOptions: IFuseOptions<unknown> = {
	ignoreDiacritics: true,
	threshold: 0.3
};
