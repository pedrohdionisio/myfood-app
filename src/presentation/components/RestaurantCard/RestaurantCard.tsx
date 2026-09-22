import { ClockIcon, StarIcon } from 'lucide-react-native';
import { AppImage } from 'presentation/components/AppImage/AppImage';
import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { formatPrice } from 'shared/utils/formatPrice';
import type { IRestaurantCardProps } from './RestaurantCardTypes';
import { toCuisineLabel } from './utils/toCuisineLabel';

export function RestaurantCard({ restaurant }: IRestaurantCardProps) {
	const isClosed = !restaurant.isOpenNow || !restaurant.isAcceptingOrders;
	const cuisineLabel = toCuisineLabel(restaurant.cuisines);

	return (
		<View className='flex-row items-center gap-4 rounded-xl border border-gray-200 bg-white p-4'>
			<AppImage className='h-16 w-16 rounded-lg bg-gray-100' source={restaurant.logoUrls?.sm} />

			<View className='flex-1 gap-1'>
				<AppText color='strong' numberOfLines={1} size='bodyMd' weight='semibold'>
					{restaurant.tradeName}
				</AppText>

				{!!cuisineLabel && (
					<AppText color='subtle' numberOfLines={1} size='bodySm'>
						{cuisineLabel}
					</AppText>
				)}

				<View className='flex-row items-center gap-3'>
					<View className='flex-row items-center gap-1'>
						<StarIcon color={COLORS.warning} size={14} strokeWidth={2} />

						<AppText color='muted' size='bodySm'>
							{restaurant.ratingCount > 0 ? restaurant.ratingAvg.toFixed(1) : 'Novo'}
						</AppText>
					</View>

					<View className='flex-row items-center gap-1'>
						<ClockIcon color={COLORS.gray[400]} size={14} strokeWidth={2} />

						<AppText color='muted' size='bodySm'>
							{restaurant.avgPrepTimeMin} min
						</AppText>
					</View>
				</View>

				<AppText color='muted' size='bodySm'>
					{restaurant.deliveryFeeCents === 0
						? 'Entrega grátis'
						: `Entrega ${formatPrice(restaurant.deliveryFeeCents)}`}
				</AppText>
			</View>

			{isClosed && (
				<View className='rounded-lg bg-gray-100 px-2 py-1'>
					<AppText color='muted' size='label' weight='medium'>
						Fechado
					</AppText>
				</View>
			)}
		</View>
	);
}
