import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { AppText } from 'presentation/components/AppText/AppText';
import { Switch, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IDiscoveryFiltersSheetProps } from './DiscoveryFiltersSheetTypes';

export function DiscoveryFiltersSheet({
	sheetRef,
	includeClosed,
	onToggleIncludeClosed
}: IDiscoveryFiltersSheetProps) {
	return (
		<BottomSheetModal
			backgroundStyle={{ backgroundColor: COLORS.white }}
			handleIndicatorStyle={{ backgroundColor: COLORS.gray[300] }}
			ref={sheetRef}
		>
			<BottomSheetView>
				<View className='gap-6 px-6 pt-2 pb-10'>
					<AppText color='strong' size='titleSm' weight='semibold'>
						Filtros
					</AppText>

					<View className='flex-row items-center justify-between gap-4'>
						<View className='flex-1 gap-1'>
							<AppText color='strong' size='bodyMd' weight='medium'>
								Mostrar fechados
							</AppText>

							<AppText color='muted' size='bodySm'>
								Restaurantes fechados ficam ocultos até você ligar isto.
							</AppText>
						</View>

						<Switch
							accessibilityLabel='Mostrar restaurantes fechados'
							onValueChange={onToggleIncludeClosed}
							thumbColor={COLORS.white}
							trackColor={{ false: COLORS.gray[300], true: COLORS.brand.DEFAULT }}
							value={includeClosed}
						/>
					</View>
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
}
