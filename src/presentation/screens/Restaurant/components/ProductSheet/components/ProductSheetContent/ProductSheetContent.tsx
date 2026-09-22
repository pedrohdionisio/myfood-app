import { AppImage } from 'presentation/components/AppImage/AppImage';
import { AppText } from 'presentation/components/AppText/AppText';
import { Button } from 'presentation/components/Button/Button';
import { QuantityStepper } from 'presentation/components/QuantityStepper/QuantityStepper';
import { TextInput, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { formatPrice } from 'shared/utils/formatPrice';
import type { IProductSheetContentProps } from './ProductSheetContentTypes';
import { useProductSheetContentController } from './useProductSheetContentController';

export function ProductSheetContent({ product, onAdd }: IProductSheetContentProps) {
	const {
		quantity,
		notes,
		totalCents,
		handleIncrease,
		handleDecrease,
		handleChangeNotes,
		handleAdd
	} = useProductSheetContentController({ product, onAdd });

	return (
		<View className='gap-5 px-6 pt-2 pb-10'>
			<View className='flex-row items-center gap-4'>
				<AppImage className='h-20 w-20 rounded-lg bg-gray-100' source={product.imageUrls?.sm} />

				<View className='flex-1 gap-1'>
					<AppText color='strong' size='titleSm' weight='semibold'>
						{product.name}
					</AppText>

					<AppText color='brand' size='bodyMd' weight='semibold'>
						{formatPrice(product.priceCents)}
					</AppText>
				</View>
			</View>

			{!!product.description && (
				<AppText color='muted' size='bodySm'>
					{product.description}
				</AppText>
			)}

			<View className='gap-2'>
				<AppText color='muted' size='label' weight='medium'>
					Observação
				</AppText>

				<TextInput
					className='min-h-12 rounded-xl border border-gray-200 bg-white px-4 py-3 font-inter-regular text-body-md text-gray-900'
					maxLength={280}
					multiline
					onChangeText={handleChangeNotes}
					placeholder='Sem cebola, ponto da carne...'
					placeholderTextColor={COLORS.gray[400]}
					value={notes}
				/>
			</View>

			<View className='flex-row items-center gap-4'>
				<QuantityStepper
					onDecrease={handleDecrease}
					onIncrease={handleIncrease}
					quantity={quantity}
				/>

				<View className='flex-1'>
					<Button onPress={handleAdd} size='md' title={`Adicionar ${formatPrice(totalCents)}`} />
				</View>
			</View>
		</View>
	);
}
