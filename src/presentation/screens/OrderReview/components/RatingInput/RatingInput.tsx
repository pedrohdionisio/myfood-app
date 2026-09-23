import { StarIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IRatingInputProps } from './RatingInputTypes';

const RATING_LABELS = ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Excelente'];

export function RatingInput({ value, errorMessage, onSelect }: IRatingInputProps) {
	return (
		<View className='items-center gap-3'>
			<View accessibilityRole='radiogroup' className='flex-row gap-2'>
				{RATING_LABELS.map((label, index) => {
					const rating = index + 1;
					const isFilled = rating <= value;

					return (
						<Pressable
							accessibilityLabel={`Nota ${rating}: ${label}`}
							accessibilityRole='radio'
							accessibilityState={{ checked: rating === value }}
							className='active:opacity-80'
							hitSlop={4}
							key={label}
							onPress={() => onSelect(rating)}
						>
							<StarIcon
								color={isFilled ? COLORS.warning : COLORS.gray[300]}
								fill={isFilled ? COLORS.warning : 'transparent'}
								size={36}
								strokeWidth={1.8}
							/>
						</Pressable>
					);
				})}
			</View>

			<AppText color={errorMessage ? 'destructive' : 'muted'} size='bodySm'>
				{errorMessage ?? RATING_LABELS[value - 1] ?? 'Toque nas estrelas para dar sua nota'}
			</AppText>
		</View>
	);
}
