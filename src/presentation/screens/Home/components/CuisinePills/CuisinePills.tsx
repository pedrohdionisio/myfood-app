import { AppText } from 'presentation/components/AppText/AppText';
import { FlatList, Pressable } from 'react-native';
import { cn } from 'shared/utils/cn';
import type { ICuisinePillsProps } from './CuisinePillsTypes';

export function CuisinePills({
	cuisineCategories,
	selectedCuisineSlug,
	onSelectCuisine
}: ICuisinePillsProps) {
	return (
		<FlatList
			className='-mx-6'
			contentContainerClassName='gap-2 px-6'
			data={cuisineCategories}
			horizontal
			keyExtractor={(cuisine) => cuisine.id}
			renderItem={({ item }) => {
				const isSelected = selectedCuisineSlug === item.slug;

				return (
					<Pressable
						accessibilityLabel={`Filtrar por ${item.name}`}
						accessibilityRole='button'
						accessibilityState={{ selected: isSelected }}
						className={cn(
							'h-9 items-center justify-center rounded-full border px-4 active:opacity-80',
							isSelected ? 'border-brand bg-brand' : 'border-gray-200 bg-white'
						)}
						onPress={() => onSelectCuisine(item.slug)}
					>
						<AppText color={isSelected ? 'inverse' : 'default'} size='bodySm' weight='medium'>
							{item.name}
						</AppText>
					</Pressable>
				);
			}}
			showsHorizontalScrollIndicator={false}
		/>
	);
}
