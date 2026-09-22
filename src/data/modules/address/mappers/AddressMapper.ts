import type { IPersistenceViaCepAddress } from 'data/modules/address/types/AddressTypes';
import type { IAddress } from 'shared/entities/IAddress';
import { onlyDigits } from 'shared/utils/onlyDigits';

function toDomain(dto: IPersistenceViaCepAddress): IAddress {
	return {
		zipCode: onlyDigits(dto.cep),
		street: dto.logradouro.trim(),
		neighborhood: dto.bairro.trim(),
		city: dto.localidade.trim(),
		state: dto.uf.trim().toUpperCase()
	};
}

export const AddressMapper = {
	toDomain
};
