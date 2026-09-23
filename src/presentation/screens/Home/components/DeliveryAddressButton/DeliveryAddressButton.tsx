import { ChevronDownIcon, MapPinIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IDeliveryAddressButtonProps } from './DeliveryAddressButtonTypes';

export function DeliveryAddressButton({ address, onPress }: IDeliveryAddressButtonProps) {
	return (
		<Pressable
			accessibilityHint='Abre a lista de endereços para trocar onde entregar'
			accessibilityRole='button'
			className='flex-row items-center gap-2 self-start active:opacity-80'
			hitSlop={8}
			onPress={onPress}
		>
			<MapPinIcon color={COLORS.brand.DEFAULT} size={18} strokeWidth={2} />

			<View className='shrink'>
				<AppText color='muted' size='label'>
					Entregar em
				</AppText>

				<AppText color='strong' numberOfLines={1} size='bodySm' weight='semibold'>
					{address.street}, {address.number}
				</AppText>
			</View>

			<ChevronDownIcon color={COLORS.gray[500]} size={18} strokeWidth={2} />
		</Pressable>
	);
}
