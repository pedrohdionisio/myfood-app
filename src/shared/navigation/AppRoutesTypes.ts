export type AuthRoutesParamList = {
	SignIn: undefined;
	SignUp: undefined;
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
	Addresses: undefined;
	AddressForm: { addressId?: string };
};

declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends AuthRoutesParamList,
				AppTabRoutesParamList,
				AppRoutesParamList {}
	}
}
