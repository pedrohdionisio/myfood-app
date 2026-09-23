import { useEffect, useState } from 'react';

const TICK_MS = 1000;

function toRemainingMs(deadline: string | null) {
	return deadline ? Math.max(new Date(deadline).getTime() - Date.now(), 0) : null;
}

export function useRemainingTime(deadline: string | null) {
	const [remainingMs, setRemainingMs] = useState(() => toRemainingMs(deadline));

	useEffect(() => {
		setRemainingMs(toRemainingMs(deadline));

		if (!deadline) {
			return;
		}

		const intervalId = setInterval(() => setRemainingMs(toRemainingMs(deadline)), TICK_MS);

		return () => clearInterval(intervalId);
	}, [deadline]);

	return remainingMs;
}
