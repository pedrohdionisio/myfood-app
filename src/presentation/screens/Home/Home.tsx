import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Home() {
	const { top } = useSafeAreaInsets();

	return (
		<View className='flex-1 gap-2 bg-gray-50 px-6' style={{ paddingTop: top + 24 }}>
			<AppText size='eyebrow' weight='medium' color='brand'>
				MyFood
			</AppText>

			<AppText size='titleLg' weight='semibold' color='strong'>
				Scaffold no ar
			</AppText>

			<AppText color='muted'>
				Expo, NativeWind, React Query e React Navigation configurados.
			</AppText>
		</View>
	);
}
