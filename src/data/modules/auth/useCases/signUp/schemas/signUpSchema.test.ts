import { signUpSchema } from './signUpSchema';

const validForm = {
	name: '  Ana Souza  ',
	email: 'ana@myfood.test',
	phone: '(11) 98765-4321',
	password: 'SenhaForte1'
};

describe('signUpSchema', () => {
	it('should trim the name and send the phone as digits', () => {
		expect(signUpSchema.parse(validForm)).toEqual({
			name: 'Ana Souza',
			email: 'ana@myfood.test',
			password: 'SenhaForte1',
			phone: '11987654321'
		});
	});

	it('should leave the phone out when it is empty', () => {
		expect(signUpSchema.parse({ ...validForm, phone: '' }).phone).toBeUndefined();
	});

	it('should reject a phone without the area code', () => {
		const result = signUpSchema.safeParse({ ...validForm, phone: '98765-4321' });

		expect(result.error?.issues).toEqual([
			expect.objectContaining({ path: ['phone'], message: 'Informe um telefone válido com DDD' })
		]);
	});

	it.each([
		['Curta1', 'A senha deve ter no mínimo 8 caracteres'],
		['semmaiuscula1', 'A senha precisa de letra maiúscula, letra minúscula e número'],
		['SemNumeroAqui', 'A senha precisa de letra maiúscula, letra minúscula e número']
	])('should reject the password %p', (password, message) => {
		const result = signUpSchema.safeParse({ ...validForm, password });

		expect(result.error?.issues).toEqual([
			expect.objectContaining({ path: ['password'], message })
		]);
	});
});
