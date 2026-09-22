import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { COLORS } from 'shared/constants/colors';
import { ProductSheetContent } from './components/ProductSheetContent/ProductSheetContent';
import type { IProductSheetProps } from './ProductSheetTypes';

export function ProductSheet({ sheetRef, product, onAdd }: IProductSheetProps) {
	return (
		<BottomSheetModal
			backgroundStyle={{ backgroundColor: COLORS.white }}
			handleIndicatorStyle={{ backgroundColor: COLORS.gray[300] }}
			ref={sheetRef}
		>
			<BottomSheetView>
				{!!product && <ProductSheetContent key={product.id} onAdd={onAdd} product={product} />}
			</BottomSheetView>
		</BottomSheetModal>
	);
}
