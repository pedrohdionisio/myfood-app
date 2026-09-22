import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { CheckIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IAddressSheetProps } from './AddressSheetTypes';

export function AddressSheet({
	sheetRef,
	addresses,
	selectedAddressId,
	onSelectAddress,
	onManageAddresses
}: IAddressSheetProps) {
	return (
		<BottomSheetModal
			backgroundStyle={{ backgroundColor: COLORS.white }}
			handleIndicatorStyle={{ backgroundColor: COLORS.gray[300] }}
			ref={sheetRef}
		>
			<BottomSheetView>
				<View className='gap-4 px-6 pt-2 pb-10'>
					<AppText color='strong' size='titleSm' weight='semibold'>
						Entregar em
					</AppText>

					{addresses.map((address) => (
						<Pressable
							accessibilityRole='button'
							accessibilityState={{ selected: address.id === selectedAddressId }}
							className='flex-row items-center gap-3 active:opacity-80'
							key={address.id}
							onPress={() => onSelectAddress(address.id)}
						>
							<View className='flex-1 gap-0.5'>
								<AppText color='strong' numberOfLines={1} size='bodyMd'>
									{address.street}, {address.number}
								</AppText>

								<AppText color='muted' numberOfLines={1} size='bodySm'>
									{address.neighborhood} · {address.city}/{address.state}
								</AppText>
							</View>

							{address.id === selectedAddressId && (
								<CheckIcon color={COLORS.brand.DEFAULT} size={20} strokeWidth={2} />
							)}
						</Pressable>
					))}

					<Button
						onPress={onManageAddresses}
						size='md'
						title='Gerenciar endereços'
						variant='outline'
					/>
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
}
