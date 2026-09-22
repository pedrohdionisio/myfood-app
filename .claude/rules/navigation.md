---
paths:
  - "src/shared/navigation/**/*.{ts,tsx}"
---

# Navegação

React Navigation 7. Todo o roteamento vive em `src/shared/navigation/` — a pasta da screen exporta
só o componente, e nunca registra a própria rota.

Não existe Expo Router aqui, e não é por acaso: o roteamento por arquivo exigiria uma pasta `app/`
no topo, que competiria com `presentation/screens/` e quebraria a regra de que rota mora em
`shared/`.

## Arquivos

```
src/shared/navigation/
├── AppRoutesTypes.ts    # o param list e a augmentação global
└── Navigation.tsx       # NavigationContainer + o stack
```

Quando o app ganhar sessão e abas, esta pasta cresce no molde do dashboard e dos apps irmãos:
`Navigation` decide entre `AuthStack` e `AppStack` pelo estado da sessão, e `AppTabNavigator` fica
dentro do `AppStack`. Cada um em arquivo próprio.

## Param list

```ts
export type AppRoutesParamList = {
	Home: undefined;
	Restaurant: { restaurantId: string };
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends AppRoutesParamList {}
	}
}
```

`AppRoutesParamList` é `type`, **não** `interface`. O React Navigation exige que o param list
satisfaça `ParamListBase`, que pede index signature implícita — só `type` tem isso, e trocar para
`interface` quebra o `createNativeStackNavigator` com `TS2344`.

A augmentação de `RootParamList` é o que faz `useNavigation()` vir tipado sem cada screen importar o
param list. É a única exceção ao "sem `namespace`" do `erasableSyntaxOnly`, e ela passa porque é
declaração ambiente, sem runtime.

## Rota nova

Entra em **dois** lugares, sempre juntos:

1. a entrada no `AppRoutesParamList`, com os params que ela recebe (`undefined` quando não recebe);
2. o `<Stack.Screen>` no navigator.

Nome de rota em PascalCase, igual ao nome da screen.

## Navegar e ler params

Do controller, nunca do `.tsx`:

```ts
import { useNavigation, useRoute } from '@react-navigation/native';

export function useRestaurantController() {
	const navigation = useNavigation();
	const { params } = useRoute<RouteProp<AppRoutesParamList, 'Restaurant'>>();

	function handleOpenCheckout() {
		navigation.navigate('Checkout');
	}

	return { restaurantId: params.restaurantId, handleOpenCheckout };
}
```

Screen não recebe props de navegação na assinatura — o que ela precisa vem do controller, que lê da
rota. Isso mantém a regra de que screen não recebe props.

## Header

`headerShown: false` é o default do projeto: header é componente nosso, dentro da screen, com os
tokens do design system. Header nativo só quando houver motivo explícito.
