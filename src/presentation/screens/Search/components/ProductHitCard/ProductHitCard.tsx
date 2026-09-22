import { AppImage } from 'presentation/components/AppImage/AppImage';
import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { formatPrice } from 'shared/utils/formatPrice';
import type { IProductHitCardProps } from './ProductHitCardTypes';

export function ProductHitCard({ product }: IProductHitCardProps) {
	return (
		<View className='flex-row items-center gap-4 rounded-xl border border-gray-200 bg-white p-4'>
			<AppImage className='h-16 w-16 rounded-lg bg-gray-100' source={product.imageUrls?.sm} />

			<View className='flex-1 gap-1'>
				<AppText color='strong' numberOfLines={1} size='bodyMd' weight='semibold'>
					{product.name}
				</AppText>

				<AppText color='muted' numberOfLines={1} size='bodySm'>
					{product.restaurant.tradeName}
				</AppText>

				<AppText color='brand' size='bodySm' weight='semibold'>
					{formatPrice(product.priceCents)}
				</AppText>
			</View>
		</View>
	);
}
