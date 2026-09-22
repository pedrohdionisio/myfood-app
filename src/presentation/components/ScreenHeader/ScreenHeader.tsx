import { ChevronLeftIcon } from 'lucide-react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import { Pressable, View } from 'react-native';
import { COLORS } from 'shared/constants/colors';
import type { IScreenHeaderProps } from './ScreenHeaderTypes';

export function ScreenHeader({ title, onBack }: IScreenHeaderProps) {
	return (
		<View className='flex-row items-center gap-3'>
			<Pressable
				accessibilityLabel='Voltar'
				accessibilityRole='button'
				hitSlop={8}
				onPress={onBack}
			>
				<ChevronLeftIcon color={COLORS.gray[700]} size={24} strokeWidth={1.8} />
			</Pressable>

			<AppText color='strong' size='titleSm' weight='semibold'>
				{title}
			</AppText>
		</View>
	);
}
