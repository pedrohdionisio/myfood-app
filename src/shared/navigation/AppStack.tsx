import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Addresses } from 'presentation/screens/Addresses/Addresses';
import { AddressForm } from 'presentation/screens/AddressForm/AddressForm';
import { Restaurant } from 'presentation/screens/Restaurant/Restaurant';
import type { AppRoutesParamList } from './AppRoutesTypes';
import { AppTabNavigator } from './AppTabNavigator';

const Stack = createNativeStackNavigator<AppRoutesParamList>();

export function AppStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen component={AppTabNavigator} name='Tabs' />
			<Stack.Screen component={Restaurant} name='Restaurant' />
			<Stack.Screen component={Addresses} name='Addresses' />
			<Stack.Screen component={AddressForm} name='AddressForm' />
		</Stack.Navigator>
	);
}
