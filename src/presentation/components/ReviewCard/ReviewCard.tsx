import { AppText } from 'presentation/components/AppText/AppText';
import { StarRating } from 'presentation/components/StarRating/StarRating';
import { View } from 'react-native';
import { formatDateTime } from 'shared/utils/formatDateTime';
import type { IReviewCardProps } from './ReviewCardTypes';

export function ReviewCard({ title, rating, comment, reply, createdAt }: IReviewCardProps) {
	return (
		<View className='gap-2 rounded-xl border border-gray-200 bg-white p-4'>
			<View className='flex-row items-center justify-between gap-3'>
				<AppText color='strong' numberOfLines={1} size='bodyMd' weight='semibold'>
					{title}
				</AppText>

				<AppText color='muted' size='label'>
					{formatDateTime(createdAt)}
				</AppText>
			</View>

			<StarRating rating={rating} />

			{!!comment && (
				<AppText color='default' size='bodySm'>
					{comment}
				</AppText>
			)}

			{!!reply && (
				<View className='mt-1 gap-1 rounded-lg bg-gray-50 p-3'>
					<AppText color='muted' size='label' weight='medium'>
						Resposta do restaurante
					</AppText>

					<AppText color='default' size='bodySm'>
						{reply}
					</AppText>
				</View>
			)}
		</View>
	);
}
