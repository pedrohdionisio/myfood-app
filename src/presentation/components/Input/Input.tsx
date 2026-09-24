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
	mask,
	endAdornment,
	...props
}: IInputProps<TFieldValues, TName, TTransformedValues>) {
	const { value, errorMessage, handleChangeText, handleBlur } = useInputController({
		control,
		name,
		mask
	});

	return (
		<View className='gap-1.5'>
			<AppText color='muted' size='label' weight='medium'>
				{label}
			</AppText>

			<View className='justify-center'>
				<TextInput
					accessibilityLabel={label}
					className={cn(
						'h-12 rounded-xl border bg-white px-4 font-inter-regular text-body-md text-gray-900',
						errorMessage ? 'border-destructive' : 'border-gray-200',
						!!endAdornment && 'pr-12',
						className
					)}
					onBlur={handleBlur}
					onChangeText={handleChangeText}
					placeholderTextColor={COLORS.gray[400]}
					value={value}
					{...props}
				/>

				{!!endAdornment && <View className='absolute right-2'>{endAdornment}</View>}
			</View>

			{!!errorMessage && (
				<AppText color='destructive' size='bodySm'>
					{errorMessage}
				</AppText>
			)}
		</View>
	);
}
