import { AppText } from 'presentation/components/AppText/AppText';
import { ScreenLayout } from 'presentation/layouts/ScreenLayout/ScreenLayout';
import { Pressable, View } from 'react-native';
import { ProfileSelector } from './components/ProfileSelector/ProfileSelector';
import { SignInForm } from './components/SignInForm/SignInForm';
import { SignInHeader } from './components/SignInHeader/SignInHeader';
import { useSignInController } from './useSignInController';

export function SignIn() {
	const {
		profile,
		shouldShowSignUp,
		handleSelectProfile,
		handleGoToForgotPassword,
		handleGoToSignUp
	} = useSignInController();

	return (
		<ScreenLayout className='justify-center'>
			<SignInHeader />

			<ProfileSelector
				onSelect={(selectedProfile) => handleSelectProfile({ profile: selectedProfile })}
				selectedProfile={profile}
			/>

			<SignInForm profile={profile} />

			<Pressable
				accessibilityRole='link'
				className='mt-4 self-center active:opacity-80'
				hitSlop={8}
				onPress={handleGoToForgotPassword}
			>
				<AppText color='brand' size='bodySm' weight='medium'>
					Esqueci minha senha
				</AppText>
			</Pressable>

			{shouldShowSignUp ? (
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
			) : (
				<AppText align='center' className='mt-6' color='muted' size='bodySm'>
					Use o e-mail e a senha que o restaurante cadastrou para você.
				</AppText>
			)}
		</ScreenLayout>
	);
}
