import { formatRemainingTime } from './formatRemainingTime';

describe('formatRemainingTime', () => {
	it.each([
		[0, '00:00'],
		[1, '00:01'],
		[59_000, '00:59'],
		[60_000, '01:00'],
		[899_001, '15:00']
	])('should format %p ms as %p', (remainingMs, expected) => {
		expect(formatRemainingTime(remainingMs)).toBe(expected);
	});
});
