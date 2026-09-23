import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SessionUnavailable } from 'presentation/screens/SessionUnavailable/SessionUnavailable';
import type { SessionRoutesParamList } from './AppRoutesTypes';

const Stack = createNativeStackNavigator<SessionRoutesParamList>();

export function SessionUnavailableStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen component={SessionUnavailable} name='SessionUnavailable' />
		</Stack.Navigator>
	);
}
