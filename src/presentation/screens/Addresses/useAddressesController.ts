import { useNavigation } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import { useDeleteAddress } from 'data/modules/customerAddress/useCases/deleteAddress/useDeleteAddress';
import { useListAddresses } from 'data/modules/customerAddress/useCases/listAddresses/useListAddresses';
import { useSetDefaultAddress } from 'data/modules/customerAddress/useCases/setDefaultAddress/useSetDefaultAddress';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useScreenPadding } from 'shared/hooks/useScreenPadding';
import type { AddressesListState, IHandleAddressParams } from './AddressesTypes';

export function useAddressesController() {
	const navigation = useNavigation();
	const contentPadding = useScreenPadding();
	const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

	const { addresses, isLoadingAddresses, addressesError, refetchAddresses } = useListAddresses();
	const { setDefaultAddress } = useSetDefaultAddress();
	const { deleteAddress } = useDeleteAddress();

	function resolveListState(): AddressesListState {
		if (isLoadingAddresses) {
			return 'loading';
		}

		if (addressesError) {
			return 'error';
		}

		return 'empty';
	}

	async function handleSetDefault({ addressId }: IHandleAddressParams) {
		setActionErrorMessage(null);

		try {
			await setDefaultAddress(addressId);
		} catch (error) {
			setActionErrorMessage(getApiErrorMessage(error));
		}
	}

	function handleDelete({ addressId }: IHandleAddressParams) {
		Alert.alert('Excluir endereço', 'Esta ação não pode ser desfeita.', [
			{ text: 'Cancelar', style: 'cancel' },
			{
				text: 'Excluir',
				style: 'destructive',
				onPress: async () => {
					setActionErrorMessage(null);

					try {
						await deleteAddress(addressId);
					} catch (error) {
						setActionErrorMessage(getApiErrorMessage(error));
					}
				}
			}
		]);
	}

	function handleEdit({ addressId }: IHandleAddressParams) {
		navigation.navigate('AddressForm', { addressId });
	}

	function handleAddAddress() {
		navigation.navigate('AddressForm', {});
	}

	function handleRetry() {
		refetchAddresses();
	}

	function handleGoBack() {
		navigation.goBack();
	}

	return {
		addresses,
		contentPadding,
		listState: resolveListState(),
		errorMessage: addressesError ? getApiErrorMessage(addressesError) : '',
		actionErrorMessage,
		handleSetDefault,
		handleDelete,
		handleEdit,
		handleAddAddress,
		handleRetry,
		handleGoBack
	};
}
