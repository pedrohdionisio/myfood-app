import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword } from 'presentation/screens/ForgotPassword/ForgotPassword';
import { ResetPassword } from 'presentation/screens/ResetPassword/ResetPassword';
import { SignIn } from 'presentation/screens/SignIn/SignIn';
import { SignUp } from 'presentation/screens/SignUp/SignUp';
import type { AuthRoutesParamList } from './AppRoutesTypes';

const Stack = createNativeStackNavigator<AuthRoutesParamList>();

export function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen component={SignIn} name='SignIn' />
			<Stack.Screen component={SignUp} name='SignUp' />
			<Stack.Screen component={ForgotPassword} name='ForgotPassword' />
			<Stack.Screen component={ResetPassword} name='ResetPassword' />
		</Stack.Navigator>
	);
}
