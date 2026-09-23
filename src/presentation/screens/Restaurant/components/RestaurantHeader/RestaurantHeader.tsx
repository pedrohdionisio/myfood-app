import { BikeIcon, ClockIcon, StarIcon } from 'lucide-react-native';
import { AppImage } from 'presentation/components/AppImage/AppImage';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { formatPrice } from 'shared/utils/formatPrice';
import { toCuisineLabel } from 'shared/utils/toCuisineLabel';
import type { IRestaurantHeaderProps } from './RestaurantHeaderTypes';

const BANNER_HEIGHT = 180;

export function RestaurantHeader({ restaurant, topInset, onOpenReviews }: IRestaurantHeaderProps) {
	const cuisineLabel = toCuisineLabel(restaurant.cuisines);
	const isClosed = !restaurant.isOpenNow || !restaurant.isAcceptingOrders;

	return (
		<View className='mb-2'>
			<View style={{ height: BANNER_HEIGHT + topInset }}>
				<AppImage
					className='h-full w-full bg-gray-200'
					fallbackIconSize={32}
					source={restaurant.bannerUrls?.md}
				/>
			</View>

			<View className='-mt-10 items-center px-6'>
				<AppImage
					className='h-20 w-20 rounded-full border-4 border-background bg-gray-100'
					source={restaurant.logoUrls?.sm}
				/>

				<AppText align='center' className='mt-3' color='strong' size='titleMd' weight='semibold'>
					{restaurant.tradeName}
				</AppText>

				{!!cuisineLabel && (
					<AppText align='center' color='muted' size='bodySm'>
						{cuisineLabel}
					</AppText>
				)}

				<AppText align='center' color='subtle' size='bodySm'>
					{restaurant.neighborhood} · {restaurant.city}/{restaurant.state}
				</AppText>

				{isClosed && (
					<View className='mt-3 rounded-lg bg-gray-100 px-3 py-1'>
						<AppText color='muted' size='label' weight='medium'>
							Fechado agora
						</AppText>
					</View>
				)}

				<View className='mt-4 w-full flex-row items-center justify-between rounded-xl border border-gray-200 bg-white p-4'>
					<Pressable
						accessibilityHint='Abre as avaliações do restaurante'
						accessibilityRole='button'
						accessibilityState={{ disabled: restaurant.ratingCount === 0 }}
						className='flex-1 items-center gap-1 active:opacity-80'
						disabled={restaurant.ratingCount === 0}
						onPress={onOpenReviews}
					>
						<StarIcon color={COLORS.warning} size={16} strokeWidth={2} />

						<AppText color='strong' size='bodySm' weight='semibold'>
							{restaurant.ratingCount > 0 ? restaurant.ratingAvg.toFixed(1) : 'Novo'}
						</AppText>

						<AppText color={restaurant.ratingCount > 0 ? 'brand' : 'muted'} size='label'>
							{restaurant.ratingCount} avaliações
						</AppText>
					</Pressable>

					<View className='h-10 w-px bg-gray-200' />

					<View className='flex-1 items-center gap-1'>
						<ClockIcon color={COLORS.gray[400]} size={16} strokeWidth={2} />

						<AppText color='strong' size='bodySm' weight='semibold'>
							{restaurant.avgPrepTimeMin} min
						</AppText>

						<AppText color='subtle' size='label'>
							preparo
						</AppText>
					</View>

					<View className='h-10 w-px bg-gray-200' />

					<View className='flex-1 items-center gap-1'>
						<BikeIcon color={COLORS.gray[400]} size={16} strokeWidth={2} />

						<AppText color='strong' size='bodySm' weight='semibold'>
							{restaurant.deliveryFeeCents === 0
								? 'Grátis'
								: formatPrice(restaurant.deliveryFeeCents)}
						</AppText>

						<AppText color='subtle' size='label'>
							entrega
						</AppText>
					</View>
				</View>

				{restaurant.minOrderCents > 0 && (
					<AppText align='center' className='mt-3' color='muted' size='bodySm'>
						Pedido mínimo de {formatPrice(restaurant.minOrderCents)}
					</AppText>
				)}
			</View>
		</View>
	);
}
