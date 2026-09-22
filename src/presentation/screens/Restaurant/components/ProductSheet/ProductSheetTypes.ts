import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';
import type { IMenuProduct } from 'shared/entities/IMenuProduct';

export interface IAddProductParams {
	quantity: number;
	notes: string | null;
}

export interface IProductSheetProps {
	sheetRef: RefObject<BottomSheetModal | null>;
	product: IMenuProduct | null;
	onAdd: (params: IAddProductParams) => void;
}
