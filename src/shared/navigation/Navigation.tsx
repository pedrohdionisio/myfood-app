import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from 'presentation/screens/Home/Home';
import type { AppRoutesParamList } from './AppRoutesTypes';

const Stack = createNativeStackNavigator<AppRoutesParamList>();

export function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Home' component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
