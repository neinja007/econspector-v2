import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { fuseOptions } from '@/data/fuse-options';

const useSearch = <T>(list: T[], search: string, keys: string[]) => {
	const fuse = useMemo(() => {
		return new Fuse(list, { ...fuseOptions, keys });
	}, [keys, list]);

	if (search.trim()) {
		return fuse.search(search).map((result) => result.item);
	} else {
		return list;
	}
};

export default useSearch;
