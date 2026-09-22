import { AppText } from 'presentation/components/AppText/AppText';
import { View } from 'react-native';
import { Logo } from 'shared/assets/svgs/Logo';

export function SignInHeader() {
	return (
		<View className='items-center gap-3'>
			<AppText color='muted'>Bem-vindo(a) ao</AppText>

			<Logo height={32} />
		</View>
	);
}
