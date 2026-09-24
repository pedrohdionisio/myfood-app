import { resetPasswordSchema } from './resetPasswordSchema';

describe('resetPasswordSchema', () => {
	it('should send only the code and the new password', () => {
		expect(
			resetPasswordSchema.parse({
				code: ' 123456 ',
				password: 'SenhaNova1',
				passwordConfirmation: 'SenhaNova1'
			})
		).toEqual({ code: '123456', password: 'SenhaNova1' });
	});

	it('should point the mismatch at the confirmation field', () => {
		const result = resetPasswordSchema.safeParse({
			code: '123456',
			password: 'SenhaNova1',
			passwordConfirmation: 'SenhaNova2'
		});

		expect(result.error?.issues).toEqual([
			expect.objectContaining({
				path: ['passwordConfirmation'],
				message: 'As senhas não conferem'
			})
		]);
	});
});
