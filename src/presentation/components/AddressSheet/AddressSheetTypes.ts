import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';
import type { ICustomerAddress } from 'shared/entities/ICustomerAddress';

export interface IAddressSheetProps {
	sheetRef: RefObject<BottomSheetModal | null>;
	addresses: ICustomerAddress[];
	selectedAddressId: string | null;
	onSelectAddress: (addressId: string) => void;
	onManageAddresses: () => void;
}
