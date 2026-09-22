import { AppImage } from 'presentation/components/AppImage/AppImage';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { formatPrice } from 'shared/utils/formatPrice';
import type { IMenuProductRowProps } from './MenuProductRowTypes';

export function MenuProductRow({ product, onPress }: IMenuProductRowProps) {
	return (
		<Pressable
			accessibilityLabel={`Adicionar ${product.name}`}
			accessibilityRole='button'
			className='flex-row items-center gap-4 border-gray-200 border-b py-4 active:opacity-80'
			disabled={!product.isAvailable}
			onPress={onPress}
		>
			<View className='flex-1 gap-1'>
				<AppText color='strong' numberOfLines={1} size='bodyMd' weight='medium'>
					{product.name}
				</AppText>

				{!!product.description && (
					<AppText color='muted' numberOfLines={2} size='bodySm'>
						{product.description}
					</AppText>
				)}

				<AppText color={product.isAvailable ? 'brand' : 'subtle'} size='bodySm' weight='semibold'>
					{formatPrice(product.priceCents)}
				</AppText>

				{!product.isAvailable && (
					<AppText color='subtle' size='label' weight='medium'>
						Indisponível no momento
					</AppText>
				)}
			</View>

			<AppImage className='h-20 w-20 rounded-lg bg-gray-100' source={product.imageUrls?.sm} />
		</Pressable>
	);
}
