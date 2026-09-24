import { formatDateTime } from './formatDateTime';

describe('formatDateTime', () => {
	it('should format the date and time in the brazilian format', () => {
		expect(formatDateTime('2026-09-24T18:05:00.000Z')).toBe('24/09, 15:05');
	});
});
