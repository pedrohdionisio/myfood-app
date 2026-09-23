import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Input } from 'presentation/components/Input/Input';
import { ScreenHeader } from 'presentation/components/ScreenHeader/ScreenHeader';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { View } from 'react-native';
import { RatingInput } from './components/RatingInput/RatingInput';
import { useOrderReviewController } from './useOrderReviewController';

export function OrderReview() {
	const {
		control,
		rating,
		ratingErrorMessage,
		apiErrorMessage,
		isCreatingReview,
		handleSelectRating,
		handleSubmit,
		handleGoBack
	} = useOrderReviewController();

	return (
		<ScreenLayout className='gap-6'>
			<ScreenHeader onBack={handleGoBack} title='Avaliar pedido' />

			<View className='gap-2'>
				<AppText color='strong' size='titleSm' weight='semibold'>
					Como foi o seu pedido?
				</AppText>

				<AppText color='muted' size='bodySm'>
					A nota aparece na página do restaurante, com o seu primeiro nome.
				</AppText>
			</View>

			<RatingInput
				errorMessage={ratingErrorMessage}
				onSelect={(selectedRating) => handleSelectRating({ rating: selectedRating })}
				value={rating}
			/>

			<Input
				className='h-28 py-3'
				control={control}
				label='Comentário (opcional)'
				maxLength={1000}
				multiline
				name='comment'
				placeholder='Conte o que achou da comida e da entrega'
				textAlignVertical='top'
			/>

			{!!apiErrorMessage && (
				<AppText color='destructive' size='bodySm'>
					{apiErrorMessage}
				</AppText>
			)}

			<Button isLoading={isCreatingReview} onPress={handleSubmit} title='Enviar avaliação' />
		</ScreenLayout>
	);
}
