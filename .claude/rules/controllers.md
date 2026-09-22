---
paths:
  - "src/presentation/**/use*Controller.ts"
---

# Controllers

Todo estado e toda lógica de um componente ou screen vivem num controller ao lado dele. O `.tsx`
não tem `useState`, `useEffect`, handler nem chamada a `data/`.

Nome: `use<Nome>Controller.ts`, exportando `use<Nome>Controller()`. O `<Nome>` é o do componente ou
screen que ele serve — um controller pertence a exatamente um deles.

## Formato

```ts
import { useState } from 'react';
import { useListRestaurants } from 'data/modules/restaurant/useCases/listRestaurants/useListRestaurants';
import type { IHandleSelectCuisineParams } from './HomeTypes';

export function useHomeController() {
	const [selectedCuisineId, setSelectedCuisineId] = useState<string | null>(null);
	const { restaurants, isLoadingRestaurants } = useListRestaurants({ selectedCuisineId });

	function handleSelectCuisine({ cuisineId }: IHandleSelectCuisineParams) {
		setSelectedCuisineId(cuisineId);
	}

	return {
		restaurants,
		isLoadingRestaurants,
		selectedCuisineId,
		handleSelectCuisine
	};
}
```

## Regras

- Retorne **um objeto** com o que a view consome. Sem tupla, sem posicional.
- Handlers recebem **um objeto de params tipado**, nunca argumentos posicionais:
  `handleSelectCuisine({ cuisineId })`. A interface do param vai no `<Nome>Types.ts` ao lado, com
  prefixo `I`.
- Handlers começam com `handle`. Valores derivados não — exponha o valor pronto
  (`shouldShowEmptyState`, `totalLabel`), não a função que calcula.
- O controller decide; a view só renderiza. Se um ternário no JSX cresceu, o booleano que ele testa
  devia vir pronto do controller.
- Chamadas a `data/` entram aqui, não no `.tsx`. Estado de request (`isLoading`, `error`) é estado
  de controller.
- Controller não renderiza nada e não importa JSX.
- Controller de componente pode receber params — um objeto tipado, mesma regra dos handlers.
  Controller de screen não recebe nada: o que ele precisa vem da rota, via `useRoute`.

## Quando NÃO criar

Componente sem estado e sem handler não ganha controller — controller vazio é ruído. No momento em
que ele ganhar o primeiro `useState`, crie o controller e mova; não coloque o `useState` no `.tsx`
"só dessa vez".

## Compartilhar lógica entre controllers

Controller serve um componente só. Lógica que dois controllers precisam vira um hook em
`shared/hooks/` — não importe um controller dentro de outro.

## Erro de API

O `catch` mora aqui, não num interceptor. O texto sai de `getApiErrorMessage(error)`, nunca de um
mapa de código para texto escrito no app — ver `data-layer.md`.
