import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { fuseOptions } from '@/data/fuse-options';

const useSearch = <T>(list: T[], search: string, keys: string[]) => {
	const fuse = useMemo(() => {
		return new Fuse(list, { ...fuseOptions, keys });
	}, [keys, list]);

	return fuse.search(search).map((result) => result.item);
};

export default useSearch;
