import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';

export interface IDiscoveryFiltersSheetProps {
	sheetRef: RefObject<BottomSheetModal | null>;
	includeClosed: boolean;
	onToggleIncludeClosed: (value: boolean) => void;
}
