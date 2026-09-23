import type { AuthProfile } from 'shared/constants/authProfiles';

export type AuthRoutesParamList = {
	SignIn: undefined;
	SignUp: undefined;
	ForgotPassword: { profile: AuthProfile };
	ResetPassword: { profile: AuthProfile; email: string };
};

export type AppTabRoutesParamList = {
	Home: undefined;
	Orders: undefined;
	Account: undefined;
};

export type AppRoutesParamList = {
	Tabs: undefined;
	Restaurant: { restaurantId: string; slug: string };
	Checkout: undefined;
	Payment: { orderId: string };
	Order: { orderId: string };
	OrderReview: { orderId: string };
	RestaurantReviews: { slug: string; tradeName: string };
	Addresses: undefined;
	AddressForm: { addressId?: string };
	EditProfile: undefined;
};

export type DriverRoutesParamList = {
	Deliveries: undefined;
	Delivery: { orderId: string };
	EditProfile: undefined;
};

export type SessionRoutesParamList = {
	SessionUnavailable: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends AuthRoutesParamList,
				AppTabRoutesParamList,
				AppRoutesParamList,
				DriverRoutesParamList,
				SessionRoutesParamList {}
	}
}
