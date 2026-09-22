import { ChevronRightIcon, MapPinIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { ICheckoutAddressCardProps } from './CheckoutAddressCardTypes';

export function CheckoutAddressCard({ address, onPress }: ICheckoutAddressCardProps) {
	return (
		<Pressable
			accessibilityLabel='Escolher endereço de entrega'
			accessibilityRole='button'
			className='flex-row items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 active:opacity-80'
			onPress={onPress}
		>
			<MapPinIcon color={COLORS.gray[400]} size={20} strokeWidth={1.8} />

			<View className='flex-1 gap-0.5'>
				{address ? (
					<>
						<AppText color='strong' numberOfLines={1} size='bodyMd' weight='medium'>
							{address.street}, {address.number}
						</AppText>

						<AppText color='muted' numberOfLines={1} size='bodySm'>
							{address.neighborhood} · {address.city}/{address.state}
						</AppText>
					</>
				) : (
					<AppText color='muted' size='bodyMd'>
						Escolher endereço de entrega
					</AppText>
				)}
			</View>

			<ChevronRightIcon color={COLORS.gray[400]} size={18} strokeWidth={1.8} />
		</Pressable>
	);
}
