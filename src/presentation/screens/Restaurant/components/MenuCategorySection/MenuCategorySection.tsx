import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { MenuProductRow } from '../MenuProductRow/MenuProductRow';
import type { IMenuCategorySectionProps } from './MenuCategorySectionTypes';

export function MenuCategorySection({ category, onSelectProduct }: IMenuCategorySectionProps) {
	return (
		<View className='px-6'>
			<AppText color='strong' size='titleSm' weight='semibold'>
				{category.name}
			</AppText>

			{category.products.map((product) => (
				<MenuProductRow
					key={product.id}
					onPress={() => onSelectProduct(product)}
					product={product}
				/>
			))}
		</View>
	);
}
