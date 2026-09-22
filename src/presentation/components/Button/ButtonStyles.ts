import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	'flex-row items-center justify-center gap-2 rounded-xl px-5 active:opacity-80',
	{
		variants: {
			variant: {
				primary: 'bg-brand',
				outline: 'border border-gray-300 bg-transparent',
				ghost: 'bg-transparent'
			},
			size: {
				md: 'h-12',
				lg: 'h-14'
			},
			isDisabled: {
				true: 'opacity-50',
				false: ''
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'lg',
			isDisabled: false
		}
	}
);
