import { viaCepApi } from 'data/config/viaCepApi';
import { AddressMapper } from 'data/modules/address/mappers/AddressMapper';
import type { IPersistenceViaCepAddress } from 'data/modules/address/types/AddressTypes';
import type { IAddress } from 'shared/entities/IAddress';
import { onlyDigits } from 'shared/utils/onlyDigits';

async function findByZipCode(zipCode: string): Promise<IAddress | null> {
	const { data } = await viaCepApi.get<IPersistenceViaCepAddress>(`/${onlyDigits(zipCode)}/json/`);

	if (data.erro) {
		return null;
	}

	return AddressMapper.toDomain(data);
}

export const AddressService = {
	findByZipCode
};
