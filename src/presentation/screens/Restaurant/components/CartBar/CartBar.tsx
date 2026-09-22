import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { formatPrice } from 'shared/utils/formatPrice';
import type { ICartBarProps } from './CartBarTypes';

export function CartBar({ itemCount, subtotalCents, bottomInset, onPress }: ICartBarProps) {
	return (
		<View
			className='absolute right-0 bottom-0 left-0 px-6'
			pointerEvents='box-none'
			style={{ paddingBottom: bottomInset + 16 }}
		>
			<Pressable
				accessibilityLabel='Ver carrinho'
				accessibilityRole='button'
				className='h-14 flex-row items-center justify-between rounded-xl bg-brand px-5 active:opacity-80'
				onPress={onPress}
			>
				<AppText color='inverse' size='bodyMd' weight='semibold'>
					Ver carrinho
				</AppText>

				<AppText color='inverse' size='bodySm'>
					{itemCount} {itemCount === 1 ? 'item' : 'itens'} · {formatPrice(subtotalCents)}
				</AppText>
			</Pressable>
		</View>
	);
}
