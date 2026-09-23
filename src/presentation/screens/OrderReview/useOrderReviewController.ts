import { zodResolver } from '@hookform/resolvers/zod';
import { type RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getApiErrorMessage } from 'data/config/apiError';
import {
	type CreateReviewFormType,
	type CreateReviewPayloadType,
	createReviewSchema
} from 'data/modules/review/useCases/createReview/schemas/createReviewSchema';
import { useCreateReview } from 'data/modules/review/useCases/createReview/useCreateReview';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AppRoutesParamList } from 'shared/navigation/AppRoutesTypes';
import type { IHandleSelectRatingParams } from './OrderReviewTypes';

export function useOrderReviewController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'OrderReview'>>();
	const { orderId } = params;

	const { createReview, isCreatingReview } = useCreateReview();
	const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitted }
	} = useForm<CreateReviewFormType, unknown, CreateReviewPayloadType>({
		resolver: zodResolver(createReviewSchema),
		defaultValues: {
			rating: 0,
			comment: ''
		}
	});

	function handleSelectRating({ rating }: IHandleSelectRatingParams) {
		setValue('rating', rating, { shouldDirty: true, shouldValidate: isSubmitted });
	}

	async function onSubmit(payload: CreateReviewPayloadType) {
		setApiErrorMessage(null);

		try {
			await createReview({ orderId, ...payload });
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
		rating: watch('rating'),
		ratingErrorMessage: errors.rating?.message,
		apiErrorMessage,
		isCreatingReview,
		handleSelectRating,
		handleSubmit: handleSubmit(onSubmit),
		handleGoBack
	};
}
