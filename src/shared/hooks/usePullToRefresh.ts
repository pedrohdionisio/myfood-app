import { useState } from 'react';

export function usePullToRefresh(refresh: () => Promise<unknown>) {
	const [isRefreshing, setIsRefreshing] = useState(false);

	async function handleRefresh() {
		setIsRefreshing(true);

		try {
			await refresh();
		} finally {
			setIsRefreshing(false);
		}
	}

	return { isRefreshing, handleRefresh };
}
