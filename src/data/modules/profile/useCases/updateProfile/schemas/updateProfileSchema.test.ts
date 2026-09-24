import { updateProfileSchema } from './updateProfileSchema';

describe('updateProfileSchema', () => {
	it('should send the phone as digits', () => {
		expect(updateProfileSchema.parse({ name: 'Ana', phone: '(11) 3333-4444' })).toEqual({
			name: 'Ana',
			phone: '1133334444'
		});
	});

	it('should send null to clear the phone', () => {
		expect(updateProfileSchema.parse({ name: 'Ana', phone: '' }).phone).toBeNull();
	});
});
