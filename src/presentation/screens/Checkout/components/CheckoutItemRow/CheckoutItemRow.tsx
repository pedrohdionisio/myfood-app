import { Trash2Icon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { formatPrice } from 'shared/utils/formatPrice';
import type { ICheckoutItemRowProps } from './CheckoutItemRowTypes';

export function CheckoutItemRow({ item, onRemove }: ICheckoutItemRowProps) {
	return (
		<View className='flex-row items-center gap-3 border-gray-200 border-b py-3'>
			<AppText color='muted' size='bodySm' weight='semibold'>
				{item.quantity}x
			</AppText>

			<View className='flex-1 gap-0.5'>
				<AppText color='strong' numberOfLines={1} size='bodyMd'>
					{item.product.name}
				</AppText>

				{!!item.notes && (
					<AppText color='subtle' numberOfLines={1} size='bodySm'>
						{item.notes}
					</AppText>
				)}
			</View>

			<AppText color='strong' size='bodySm' weight='semibold'>
				{formatPrice(item.product.priceCents * item.quantity)}
			</AppText>

			<Pressable
				accessibilityLabel={`Remover ${item.product.name}`}
				accessibilityRole='button'
				hitSlop={8}
				onPress={onRemove}
			>
				<Trash2Icon color={COLORS.gray[400]} size={18} strokeWidth={1.8} />
			</Pressable>
		</View>
	);
}
