const store = new Map<string, string>();

export const secureStoreMock = {
	getItemAsync: jest.fn(async (key: string) => store.get(key) ?? null),
	setItemAsync: jest.fn(async (key: string, value: string) => {
		store.set(key, value);
	}),
	deleteItemAsync: jest.fn(async (key: string) => {
		store.delete(key);
	})
};

export function clearSecureStore() {
	store.clear();
}
