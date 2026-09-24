import { act, renderHook } from '@testing-library/react-native';
import { usePullToRefresh } from './usePullToRefresh';

describe('usePullToRefresh', () => {
	it('should mark refreshing only while the refresh is pending', async () => {
		let resolveRefresh = () => {};
		const refresh = jest.fn(
			() =>
				new Promise<void>((resolve) => {
					resolveRefresh = resolve;
				})
		);
		const { result } = await renderHook(() => usePullToRefresh(refresh));

		let pendingRefresh: Promise<void> = Promise.resolve();
		await act(() => {
			pendingRefresh = result.current.handleRefresh();
		});

		expect(result.current.isRefreshing).toBe(true);

		await act(async () => {
			resolveRefresh();
			await pendingRefresh;
		});

		expect(result.current.isRefreshing).toBe(false);
	});

	it('should stop refreshing when the refresh fails', async () => {
		const { result } = await renderHook(() =>
			usePullToRefresh(() => Promise.reject(new Error('offline')))
		);

		await act(async () => {
			await expect(result.current.handleRefresh()).rejects.toThrow('offline');
		});

		expect(result.current.isRefreshing).toBe(false);
	});
});
