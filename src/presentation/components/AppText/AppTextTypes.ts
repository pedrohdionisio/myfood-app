import type { VariantProps } from 'class-variance-authority';
import type { TextProps } from 'react-native';
import type { appTextVariants } from './appTextVariants';

export interface IAppTextProps extends TextProps, VariantProps<typeof appTextVariants> {
	className?: string;
}
