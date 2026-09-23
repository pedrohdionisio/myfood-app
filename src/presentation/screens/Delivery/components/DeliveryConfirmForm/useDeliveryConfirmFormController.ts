import { zodResolver } from '@hookform/resolvers/zod';
import { getApiErrorMessage } from 'data/config/apiError';
import {
	type ConfirmDeliveryFormType,
	confirmDeliverySchema
} from 'data/modules/delivery/useCases/confirmDelivery/schemas/confirmDeliverySchema';
import { useConfirmDelivery } from 'data/modules/delivery/useCases/confirmDelivery/useConfirmDelivery';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { IUseDeliveryConfirmFormControllerParams } from './DeliveryConfirmFormTypes';

export function useDeliveryConfirmFormController({
	orderId,
	onConfirmed
}: IUseDeliveryConfirmFormControllerParams) {
	const { confirmDelivery, isConfirmingDelivery } = useConfirmDelivery();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const { control, handleSubmit } = useForm<ConfirmDeliveryFormType>({
		resolver: zodResolver(confirmDeliverySchema),
		defaultValues: {
			code: ''
		}
	});

	async function onSubmit({ code }: ConfirmDeliveryFormType) {
		setApiErrorMessage(null);

		try {
			await confirmDelivery({ orderId, code });
			onConfirmed();
		} catch (error) {
			setApiErrorMessage(getApiErrorMessage(error));
		}
	}

	return {
		control,
		apiErrorMessage,
		isConfirmingDelivery,
		handleSubmit: handleSubmit(onSubmit)
	};
}
