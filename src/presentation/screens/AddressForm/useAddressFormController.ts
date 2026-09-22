import { zodResolver } from '@hookform/resolvers/zod';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useAddressByZipCode } from 'data/modules/address/useCases/findAddressByZipCode/useAddressByZipCode';
import {
	type AddressFormType,
	type AddressPayloadType,
	addressFormSchema
} from 'data/modules/customerAddress/schemas/addressFormSchema';
import { useCreateAddress } from 'data/modules/customerAddress/useCases/createAddress/useCreateAddress';
import { useListAddresses } from 'data/modules/customerAddress/useCases/listAddresses/useListAddresses';
import { useUpdateAddress } from 'data/modules/customerAddress/useCases/updateAddress/useUpdateAddress';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import { toFormValues } from './utils/toFormValues';

export function useAddressFormController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'AddressForm'>>();
	const addressId = params?.addressId;

	const { addresses } = useListAddresses();
	const address = addresses.find((item) => item.id === addressId) ?? null;

	const { createAddress, isCreatingAddress } = useCreateAddress();
	const { updateAddress, isUpdatingAddress } = useUpdateAddress();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const { control, handleSubmit, watch, setValue, setError, clearErrors, setFocus } = useForm<
		AddressFormType,
		unknown,
		AddressPayloadType
	>({
		resolver: zodResolver(addressFormSchema),
		values: toFormValues(address)
	});

	const {
		address: zipCodeAddress,
		isZipCodeNotFound,
		isLoadingAddress,
		addressError
	} = useAddressByZipCode(watch('zipCode'));

	useEffect(() => {
		if (isLoadingAddress) {
			clearErrors('zipCode');

			return;
		}

		if (isZipCodeNotFound) {
			setError('zipCode', { message: 'CEP não encontrado' });

			return;
		}

		if (addressError) {
			setError('zipCode', { message: 'Não foi possível consultar o CEP. Preencha na mão.' });

			return;
		}

		if (!zipCodeAddress) {
			return;
		}

		setValue('street', zipCodeAddress.street);
		setValue('neighborhood', zipCodeAddress.neighborhood);
		setValue('city', zipCodeAddress.city);
		setValue('state', zipCodeAddress.state);
		setFocus('number');
	}, [
		zipCodeAddress,
		isZipCodeNotFound,
		isLoadingAddress,
		addressError,
		setValue,
		setError,
		clearErrors,
		setFocus
	]);

	async function onSubmit(formData: AddressPayloadType) {
		setApiErrorMessage(null);

		try {
			if (addressId) {
				await updateAddress({ addressId, data: formData });
			} else {
				await createAddress(formData);
			}

			navigation.goBack();
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	function handleGoBack() {
		navigation.goBack();
	}

	return {
		control,
		apiErrorMessage,
		title: addressId ? 'Editar endereço' : 'Novo endereço',
		isSaving: isCreatingAddress || isUpdatingAddress,
		handleSubmit: handleSubmit(onSubmit),
		handleGoBack
	};
}
