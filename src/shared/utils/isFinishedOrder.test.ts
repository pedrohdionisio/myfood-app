import { isFinishedOrder } from './isFinishedOrder';

describe('isFinishedOrder', () => {
	it.each(['DELIVERED', 'DELIVERY_FAILED', 'REJECTED', 'CANCELED'] as const)(
		'should treat %s as finished',
		(status) => {
			expect(isFinishedOrder(status)).toBe(true);
		}
	);

	it.each([
		'PENDING_PAYMENT',
		'PENDING',
		'CONFIRMED',
		'PREPARING',
		'READY',
		'OUT_FOR_DELIVERY'
	] as const)('should treat %s as in progress', (status) => {
		expect(isFinishedOrder(status)).toBe(false);
	});
});
