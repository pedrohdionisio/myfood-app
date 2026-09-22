---
paths:
  - "src/presentation/**/*.{ts,tsx}"
---

# Screens, componentes e layouts

Uma pasta por peça, com o arquivo principal repetindo o nome da pasta. Pasta, arquivo e componente
em **PascalCase**.

```
Checkout/
├── Checkout.tsx                 # só JSX + consumo do controller
├── CheckoutTypes.ts             # interfaces da screen
├── useCheckoutController.ts     # estado e handlers (ver controllers.md)
├── utils/formatDeliveryEta.ts   # função usada só por esta screen
└── components/                  # componentes usados só por esta screen
    └── CheckoutSummary/
        └── CheckoutSummary.tsx
```

`<Nome>Types.ts`, `use<Nome>Controller.ts`, `utils/` e `components/` só existem se houver o que
colocar neles.

Screen **não** leva sufixo `Screen`: a pasta é `Checkout/`, o arquivo é `Checkout.tsx`. É a
adaptação do `<Nome>Page` do dashboard — aqui a camada já se chama `screens/`.

## Formato

```tsx
import { View } from 'react-native';
import { AppText } from 'presentation/components/AppText/AppText';
import type { ICheckoutSummaryProps } from './CheckoutSummaryTypes';
import { useCheckoutSummaryController } from './useCheckoutSummaryController';

export function CheckoutSummary({ orderId }: ICheckoutSummaryProps) {
	const { totalLabel } = useCheckoutSummaryController({ orderId });

	return (
		<View className='gap-1'>
			<AppText color='muted'>Total</AppText>
			<AppText weight='semibold'>{totalLabel}</AppText>
		</View>
	);
}
```

- `export function`, named export. Sem `export default`, sem arrow function.
- Props desestruturadas na assinatura, tipadas por `I<Nome>Props`.
- Um componente exportado por arquivo.
- Sem `React.FC`. Sem `memo`/`useCallback` preventivo — só com problema de performance medido.

## Onde o componente mora

| Situação                            | Lugar                                 |
| ----------------------------------- | ------------------------------------- |
| Usado por duas ou mais screens      | `src/presentation/components/<Nome>/` |
| Usado só dentro de uma screen       | `<Screen>/components/<Nome>/`         |
| Usado só dentro de outro componente | `<Componente>/components/<Nome>/`     |

Comece sempre no escopo mais fechado. Um componente só sobe para `presentation/components/` quando
um **segundo** consumidor aparece de fato — não por antecipação.

`presentation/layouts/` é para a casca que envolve um grupo de screens (safe area, teclado, header
padrão). Layout segue as regras de componente.

## A screen compõe, não desenha

O `.tsx` da screen monta os componentes e passa dados. Markup de verdade vive nos componentes
dentro de `components/`.

- Screen não recebe props. O que ela precisa vem do controller — params de rota, dados, estado.
- Estado que duas partes da screen compartilham fica no controller da screen e desce por prop.
  Estado que só um componente usa fica no controller dele.
- **Sem lógica no `.tsx`.** Estado, `useEffect`, handlers e chamadas a `data/` vão para o
  controller. Ver `controllers.md`.
- O componente não busca dado próprio direto de `data/` — quem chama é o controller.

## Toda screen precisa resolver três estados

Antes de considerar uma screen pronta:

1. **Carregando** — o que aparece enquanto o dado não chegou (skeleton ou spinner).
2. **Vazio** — componente próprio (`<Nome>ListEmpty`), com a distinção entre "não há nada" e "a
   busca não achou".
3. **Erro** — o que aparece quando a requisição falha, e como o usuário tenta de novo.

Se o design não cobre um dos três, resolva com o padrão da screen mais próxima e **diga que você
resolveu**. Não entregue tela que assume caminho feliz.

## Listas

`FlatList` para coleção — nunca `map` dentro de `ScrollView` em lista que cresce com dado da API.
`keyExtractor` usa o id do domínio, nunca o índice. `ListEmptyComponent` recebe o componente de
vazio da screen.

## Checklist ao criar

1. Escopo mais fechado possível (screen > componente > compartilhado).
2. Pasta `PascalCase/` + `PascalCase.tsx`.
3. Props em `I<Nome>Props` no `<Nome>Types.ts`.
4. Tem estado ou handler? Controller separado.
5. Estilo só com token — ver `design-system.md`.
6. `yarn typecheck && yarn lint` passam.
