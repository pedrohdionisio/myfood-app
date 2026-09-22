import { useEffect, useState } from 'react';

export function useDebouncedValue<TValue>(value: TValue, delayMs: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delayMs);

		return () => clearTimeout(timeout);
	}, [value, delayMs]);

	return debouncedValue;
}
