import { cva } from 'class-variance-authority';

export const appTextVariants = cva('', {
	variants: {
		size: {
			display: 'text-display',
			titleLg: 'text-title-lg',
			titleMd: 'text-title-md',
			titleSm: 'text-title-sm',
			eyebrow: 'text-eyebrow uppercase',
			bodyLg: 'text-body-lg',
			bodyMd: 'text-body-md',
			bodySm: 'text-body-sm',
			label: 'text-label'
		},
		weight: {
			regular: 'font-inter-regular',
			medium: 'font-inter-medium',
			semibold: 'font-inter-semibold',
			bold: 'font-inter-bold'
		},
		color: {
			default: 'text-gray-700',
			strong: 'text-gray-900',
			muted: 'text-gray-500',
			subtle: 'text-gray-400',
			inverse: 'text-white',
			brand: 'text-brand',
			destructive: 'text-destructive',
			success: 'text-success'
		},
		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right'
		}
	},
	defaultVariants: {
		size: 'bodyMd',
		weight: 'regular',
		color: 'default',
		align: 'left'
	}
});
