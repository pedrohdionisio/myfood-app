import type { IInputProps } from 'presentation/components/Input/InputTypes';
import type { FieldPathByValue, FieldValues } from 'react-hook-form';

export type PasswordInputProps<
	TFieldValues extends FieldValues,
	TName extends FieldPathByValue<TFieldValues, string>,
	TTransformedValues = TFieldValues
> = Omit<
	IInputProps<TFieldValues, TName, TTransformedValues>,
	'secureTextEntry' | 'endAdornment' | 'mask'
>;
