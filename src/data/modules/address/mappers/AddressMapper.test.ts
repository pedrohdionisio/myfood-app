import { AddressMapper } from './AddressMapper';

describe('AddressMapper', () => {
	it('should map the ViaCEP response to the domain address', () => {
		expect(
			AddressMapper.toDomain({
				cep: '01310-100',
				logradouro: ' Avenida Paulista ',
				complemento: '',
				bairro: 'Bela Vista ',
				localidade: ' São Paulo',
				uf: 'sp'
			})
		).toEqual({
			zipCode: '01310100',
			street: 'Avenida Paulista',
			neighborhood: 'Bela Vista',
			city: 'São Paulo',
			state: 'SP'
		});
	});
});
