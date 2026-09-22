import type { VariantProps } from 'class-variance-authority';
import type { PressableProps } from 'react-native';
import type { buttonVariants } from './ButtonStyles';

export interface IButtonProps
	extends Omit<PressableProps, 'children'>,
		Omit<VariantProps<typeof buttonVariants>, 'isDisabled'> {
	title: string;
	isLoading?: boolean;
	className?: string;
}
