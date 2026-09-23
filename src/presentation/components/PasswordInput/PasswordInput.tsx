import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { Input } from 'presentation/components/Input/Input';
import type { FieldPathByValue, FieldValues } from 'react-hook-form';
import { Pressable } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { PasswordInputProps } from './PasswordInputTypes';
import { usePasswordInputController } from './usePasswordInputController';

export function PasswordInput<
	TFieldValues extends FieldValues,
	TName extends FieldPathByValue<TFieldValues, string>,
	TTransformedValues = TFieldValues
>(props: PasswordInputProps<TFieldValues, TName, TTransformedValues>) {
	const { isVisible, handleToggleVisibility } = usePasswordInputController();

	return (
		<Input
			{...props}
			autoCapitalize='none'
			autoCorrect={false}
			endAdornment={
				<Pressable
					accessibilityLabel={isVisible ? 'Esconder senha' : 'Mostrar senha'}
					accessibilityRole='button'
					className='h-10 w-10 items-center justify-center rounded-lg active:opacity-80'
					hitSlop={4}
					onPress={handleToggleVisibility}
				>
					{isVisible ? (
						<EyeOffIcon color={COLORS.gray[500]} size={20} strokeWidth={1.8} />
					) : (
						<EyeIcon color={COLORS.gray[500]} size={20} strokeWidth={1.8} />
					)}
				</Pressable>
			}
			secureTextEntry={!isVisible}
		/>
	);
}
