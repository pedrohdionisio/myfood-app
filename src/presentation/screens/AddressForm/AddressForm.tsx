import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { AddressFormFields } from './components/AddressFormFields/AddressFormFields';
import { useAddressFormController } from './useAddressFormController';

export function AddressForm() {
	const { control, apiErrorMessage, title, isSaving, handleSubmit, handleGoBack } =
		useAddressFormController();

	return (
		<ScreenLayout className='gap-6'>
			<ScreenHeader onBack={handleGoBack} title={title} />

			<AddressFormFields control={control} />

			{!!apiErrorMessage && (
				<AppText color='destructive' size='bodySm'>
					{apiErrorMessage}
				</AppText>
			)}

			<Button isLoading={isSaving} onPress={handleSubmit} title='Salvar endereço' />
		</ScreenLayout>
	);
}
