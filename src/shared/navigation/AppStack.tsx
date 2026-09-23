import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Addresses } from 'presentation/screens/Addresses/Addresses';
import { AddressForm } from 'presentation/screens/AddressForm/AddressForm';
import { Checkout } from 'presentation/screens/Checkout/Checkout';
import { EditProfile } from 'presentation/screens/EditProfile/EditProfile';
import { Order } from 'presentation/screens/Order/Order';
import { OrderReview } from 'presentation/screens/OrderReview/OrderReview';
import { Payment } from 'presentation/screens/Payment/Payment';
import { Restaurant } from 'presentation/screens/Restaurant/Restaurant';
import { RestaurantReviews } from 'presentation/screens/RestaurantReviews/RestaurantReviews';
import type { AppRoutesParamList } from './AppRoutesTypes';
import { AppTabNavigator } from './AppTabNavigator';

const Stack = createNativeStackNavigator<AppRoutesParamList>();

export function AppStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen component={AppTabNavigator} name='Tabs' />
			<Stack.Screen component={Restaurant} name='Restaurant' />
			<Stack.Screen component={Checkout} name='Checkout' />
			<Stack.Screen component={Payment} name='Payment' />
			<Stack.Screen component={Order} name='Order' />
			<Stack.Screen component={OrderReview} name='OrderReview' />
			<Stack.Screen component={RestaurantReviews} name='RestaurantReviews' />
			<Stack.Screen component={Addresses} name='Addresses' />
			<Stack.Screen component={AddressForm} name='AddressForm' />
			<Stack.Screen component={EditProfile} name='EditProfile' />
		</Stack.Navigator>
	);
}
