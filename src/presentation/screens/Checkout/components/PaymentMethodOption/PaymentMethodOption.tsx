import { CheckIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { IPaymentMethodOptionProps } from './PaymentMethodOptionTypes';

export function PaymentMethodOption({ label, isSelected, onPress }: IPaymentMethodOptionProps) {
	return (
		<Pressable
			accessibilityRole='button'
			accessibilityState={{ selected: isSelected }}
			className={cn(
				'flex-row items-center justify-between rounded-xl border p-4 active:opacity-80',
				isSelected ? 'border-brand bg-brand-subtle' : 'border-gray-200 bg-white'
			)}
			onPress={onPress}
		>
			<AppText color={isSelected ? 'strong' : 'default'} size='bodyMd' weight='medium'>
				{label}
			</AppText>

			{isSelected && (
				<View>
					<CheckIcon color={COLORS.brand.DEFAULT} size={20} strokeWidth={2} />
				</View>
			)}
		</Pressable>
	);
}
