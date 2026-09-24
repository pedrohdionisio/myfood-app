import { act, renderHook } from '@testing-library/react-native';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should only publish the last value once the delay passes', async () => {
		const { result, rerender } = await renderHook(
			({ value }: { value: string }) => useDebouncedValue(value, 300),
			{ initialProps: { value: 'p' } }
		);

		await rerender({ value: 'pi' });
		await act(() => jest.advanceTimersByTime(200));
		await rerender({ value: 'piz' });
		await act(() => jest.advanceTimersByTime(200));

		expect(result.current).toBe('p');

		await act(() => jest.advanceTimersByTime(100));

		expect(result.current).toBe('piz');
	});
});
