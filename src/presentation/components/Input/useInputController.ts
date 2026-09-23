import { type FieldPathByValue, type FieldValues, useController } from 'react-hook-form';
import type { IUseInputControllerParams } from './InputTypes';

export function useInputController<
	TFieldValues extends FieldValues,
	TName extends FieldPathByValue<TFieldValues, string>,
	TTransformedValues = TFieldValues
>({ control, name, mask }: IUseInputControllerParams<TFieldValues, TName, TTransformedValues>) {
	const { field, fieldState } = useController({ control, name });

	function handleChangeText(text: string) {
		field.onChange(mask ? mask(text) : text);
	}

	return {
		value: field.value,
		errorMessage: fieldState.error?.message,
		handleChangeText,
		handleBlur: field.onBlur
	};
}
