import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { ReviewCard } from 'presentation/components/ReviewCard/ReviewCard';
import { Skeleton } from 'presentation/components/Skeleton/Skeleton';
import type { IOrderReviewSectionProps } from './OrderReviewSectionTypes';

export function OrderReviewSection({
	review,
	isLoading,
	errorMessage,
	onReview
}: IOrderReviewSectionProps) {
	if (isLoading) {
		return <Skeleton className='h-24 w-full' />;
	}

	if (errorMessage) {
		return (
			<AppText color='muted' size='bodySm'>
				{errorMessage}
			</AppText>
		);
	}

	if (review) {
		return (
			<ReviewCard
				comment={review.comment}
				createdAt={review.createdAt}
				rating={review.rating}
				reply={review.reply}
				title='Sua avaliação'
			/>
		);
	}

	return <Button onPress={onReview} title='Avaliar pedido' />;
}
