export type AppRoutesParamList = {
	Home: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends AppRoutesParamList {}
	}
}
