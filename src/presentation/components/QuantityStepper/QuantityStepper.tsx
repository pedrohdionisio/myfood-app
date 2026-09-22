import { MinusIcon, PlusIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IQuantityStepperProps } from './QuantityStepperTypes';

export function QuantityStepper({ quantity, onDecrease, onIncrease }: IQuantityStepperProps) {
	const canDecrease = quantity > 1;

	return (
		<View className='h-11 flex-row items-center gap-4 rounded-xl border border-gray-200 px-3'>
			<Pressable
				accessibilityLabel='Diminuir quantidade'
				accessibilityRole='button'
				disabled={!canDecrease}
				hitSlop={8}
				onPress={onDecrease}
			>
				<MinusIcon
					color={canDecrease ? COLORS.brand.DEFAULT : COLORS.gray[300]}
					size={18}
					strokeWidth={2}
				/>
			</Pressable>

			<AppText color='strong' size='bodyMd' weight='semibold'>
				{quantity}
			</AppText>

			<Pressable
				accessibilityLabel='Aumentar quantidade'
				accessibilityRole='button'
				hitSlop={8}
				onPress={onIncrease}
			>
				<PlusIcon color={COLORS.brand.DEFAULT} size={18} strokeWidth={2} />
			</Pressable>
		</View>
	);
}
