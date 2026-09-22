export type AuthRoutesParamList = {
	SignIn: undefined;
	SignUp: undefined;
};

export type AppTabRoutesParamList = {
	Home: undefined;
	Search: undefined;
	Account: undefined;
};

export type AppRoutesParamList = {
	Tabs: undefined;
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
