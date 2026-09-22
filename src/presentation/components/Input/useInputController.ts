import { type FieldPathByValue, type FieldValues, useController } from 'react-hook-form';
import type { IUseInputControllerParams } from './InputTypes';

export function useInputController<
	TFieldValues extends FieldValues,
	TName extends FieldPathByValue<TFieldValues, string>,
	TTransformedValues = TFieldValues
>({ control, name }: IUseInputControllerParams<TFieldValues, TName, TTransformedValues>) {
	const { field, fieldState } = useController({ control, name });

	return {
		value: field.value,
		errorMessage: fieldState.error?.message,
		handleChangeText: field.onChange,
		handleBlur: field.onBlur
	};
}
