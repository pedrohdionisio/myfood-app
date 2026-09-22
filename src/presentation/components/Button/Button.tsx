import { AppText } from 'presentation/components/AppText/AppText';
import { ActivityIndicator, Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import { buttonVariants } from './ButtonStyles';
import type { IButtonProps } from './ButtonTypes';

export function Button({
	title,
	variant = 'primary',
	size,
	isLoading = false,
	disabled,
	className,
	...props
}: IButtonProps) {
	const isDisabled = disabled || isLoading;

	return (
		<Pressable
			accessibilityRole='button'
			accessibilityState={{ disabled: isDisabled, busy: isLoading }}
			className={cn(buttonVariants({ variant, size, isDisabled }), className)}
			disabled={isDisabled}
			{...props}
		>
			{isLoading ? (
				<ActivityIndicator color={variant === 'primary' ? COLORS.white : COLORS.gray[700]} />
			) : (
				<AppText
					color={variant === 'primary' ? 'inverse' : 'strong'}
					size='bodyMd'
					weight='semibold'
				>
					{title}
				</AppText>
			)}
		</Pressable>
	);
}
