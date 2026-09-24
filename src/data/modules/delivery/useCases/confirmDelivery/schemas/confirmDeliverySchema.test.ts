import { confirmDeliverySchema } from './confirmDeliverySchema';

describe('confirmDeliverySchema', () => {
	it.each(['123', '12345', '12a4'])('should reject the code %p', (code) => {
		expect(confirmDeliverySchema.safeParse({ code }).success).toBe(false);
	});

	it('should accept a 4 digit code', () => {
		expect(confirmDeliverySchema.parse({ code: '0421' })).toEqual({ code: '0421' });
	});
});
