import { AppText } from 'presentation/components/AppText/AppText';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { Pressable, View } from 'react-native';
import { SignInForm } from './components/SignInForm/SignInForm';
import { SignInHeader } from './components/SignInHeader/SignInHeader';
import { useSignInController } from './useSignInController';

export function SignIn() {
	const { handleGoToSignUp } = useSignInController();

	return (
		<ScreenLayout className='justify-center'>
			<SignInHeader />

			<SignInForm />

			<View className='mt-6 flex-row items-center justify-center gap-1'>
				<AppText color='muted' size='bodySm'>
					Ainda não tem uma conta?
				</AppText>

				<Pressable accessibilityRole='link' hitSlop={8} onPress={handleGoToSignUp}>
					<AppText color='brand' size='bodySm' weight='medium'>
						Cadastre-se
					</AppText>
				</Pressable>
			</View>
		</ScreenLayout>
	);
}
