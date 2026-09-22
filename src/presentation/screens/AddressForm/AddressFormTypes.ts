import type {
	AddressFormType,
	AddressPayloadType
} from 'data/modules/customerAddress/schemas/addressFormSchema';
import type { Control } from 'react-hook-form';

export type AddressFormControl = Control<AddressFormType, unknown, AddressPayloadType>;
