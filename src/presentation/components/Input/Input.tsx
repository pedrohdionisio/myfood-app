import { AppText } from 'presentation/components/AppText/AppText';
import type { FieldPathByValue, FieldValues } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import { cn } from 'shared/utils/cn';
import type { IInputProps } from './InputTypes';
import { useInputController } from './useInputController';

export function Input<
	TFieldValues extends FieldValues,
	TName extends FieldPathByValue<TFieldValues, string>,
	TTransformedValues = TFieldValues
>({
	control,
	name,
	label,
	className,
	...props
}: IInputProps<TFieldValues, TName, TTransformedValues>) {
	const { value, errorMessage, handleChangeText, handleBlur } = useInputController({
		control,
		name
	});

	return (
		<View className='gap-1.5'>
			<AppText color='muted' size='label' weight='medium'>
				{label}
			</AppText>

			<TextInput
				className={cn(
					'h-12 rounded-xl border bg-white px-4 font-inter-regular text-body-md text-gray-900',
					errorMessage ? 'border-destructive' : 'border-gray-200',
					className
				)}
				onBlur={handleBlur}
				onChangeText={handleChangeText}
				placeholderTextColor={COLORS.gray[400]}
				value={value}
				{...props}
			/>

			{!!errorMessage && (
				<AppText color='destructive' size='bodySm'>
					{errorMessage}
				</AppText>
			)}
		</View>
	);
}
