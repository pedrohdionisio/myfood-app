import type { ReactNode } from 'react';
import type { Control, FieldPathByValue, FieldValues } from 'react-hook-form';
import type { TextInputProps } from 'react-native';

export interface IInputProps<
	TFieldValues extends FieldValues,
	TName extends FieldPathByValue<TFieldValues, string>,
	TTransformedValues = TFieldValues
> extends TextInputProps {
	control: Control<TFieldValues, unknown, TTransformedValues>;
	name: TName;
	label: string;
	className?: string;
	mask?: (value: string) => string;
	endAdornment?: ReactNode;
}

export interface IUseInputControllerParams<
	TFieldValues extends FieldValues,
	TName extends FieldPathByValue<TFieldValues, string>,
	TTransformedValues = TFieldValues
> {
	control: Control<TFieldValues, unknown, TTransformedValues>;
	name: TName;
	mask?: (value: string) => string;
}
