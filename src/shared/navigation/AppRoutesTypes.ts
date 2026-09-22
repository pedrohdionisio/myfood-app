export type AuthRoutesParamList = {
	SignIn: undefined;
	SignUp: undefined;
};

export type AppRoutesParamList = {
	Home: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends AuthRoutesParamList, AppRoutesParamList {}
	}
}
