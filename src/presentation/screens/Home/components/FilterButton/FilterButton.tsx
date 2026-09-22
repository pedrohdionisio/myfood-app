import { SlidersHorizontalIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { IFilterButtonProps } from './FilterButtonTypes';

export function FilterButton({ hasActiveFilters, onPress }: IFilterButtonProps) {
	return (
		<Pressable
			accessibilityLabel='Abrir filtros'
			accessibilityRole='button'
			className={cn(
				'h-12 w-12 items-center justify-center rounded-xl border active:opacity-80',
				hasActiveFilters ? 'border-brand bg-brand-subtle' : 'border-gray-200 bg-white'
			)}
			onPress={onPress}
		>
			<SlidersHorizontalIcon
				color={hasActiveFilters ? COLORS.brand.DEFAULT : COLORS.gray[600]}
				size={20}
				strokeWidth={1.8}
			/>

			{hasActiveFilters && (
				<View className='absolute top-2 right-2 h-2 w-2 rounded-full bg-brand' />
			)}
		</Pressable>
	);
}
