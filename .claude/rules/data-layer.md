---
paths:
  - "src/data/**/*.{ts,tsx}"
---

# Camada de data

Tudo que fala com o mundo externo: endpoints HTTP, clients, DTOs, mappers, storage do device,
integrações de terceiros. Só isso — regra de tela não entra aqui.

## Fronteiras

- `data/` **nunca** importa de `presentation/`. Se precisou, a lógica está na camada errada.
- `data/` pode importar de `shared/`.
- React só aparece em dois lugares de `data/`: nos **useCases**, que são hooks do React Query, e em
  `contexts/`. `config/`, `libs/`, `services/`, `mappers/` e `types/` continuam sem React — sem
  hook, sem JSX.
- O consumidor recebe uma Promise de dado já tipado. Header, query string, status HTTP e parsing
  ficam contidos aqui e não vazam para cima.

## Client e estado de servidor

`axios` para o transporte, `@tanstack/react-query` para estado de servidor. As instâncias ficam em
`data/config/api.ts` e a base URL vem de `data/config/env.ts` (`EXPO_PUBLIC_API_URL`). Nenhum
`axios.create()` fora dali.

O Metro faz inline de `process.env.EXPO_PUBLIC_*` em build time, então a variável precisa ser lida
por **referência estática** — desestruturar `process.env` devolve `undefined`. É por isso que
`env.ts` escreve `process.env.EXPO_PUBLIC_API_URL` inteiro.

O `queryClient` (`data/config/queryClient.ts`) é instanciado em escopo de módulo, não dentro do
render: criá-lo dentro do `App` o recriaria a cada re-render e jogaria o cache fora.

## Organização

Uma pasta por módulo de domínio em `data/modules/`, com o mesmo esqueleto:

```
src/data/modules/restaurant/
├── types/RestaurantTypes.ts                    # DTOs: o formato do wire
├── keys/RestaurantKeys.ts                      # chaves de query e mutation, `as const`
├── services/RestaurantService.ts               # as chamadas, uma função por endpoint
├── services/mappers/ListRestaurantsMapper.ts   # DTO -> modelo de domínio
└── useCases/listRestaurants/
    ├── useListRestaurants.ts                   # o hook que a presentation consome
    └── schemas/listRestaurantsSchema.ts        # zod, quando o caso de uso tem formulário
```

Fora dos módulos existem `config/` (client, erro, env, queryClient), `libs/` (storage e wrappers de
API nativa) e `contexts/` (provider de sessão).

Arquivo que exporta um objeto nomeado repete o nome dele em PascalCase (`RestaurantService.ts`,
`AuthTokensManager.ts`). Arquivo que exporta função ou constante solta fica em camelCase
(`listRestaurantsSchema.ts`, `useListRestaurants.ts`).

Chave de query e mutation é objeto `as const` — sem `enum`.

## Método de service não repete o nome do service

O objeto já diz de que entidade se trata, então o método só carrega o verbo:
`RestaurantService.list()`, não `RestaurantService.listRestaurants()`.

```ts
RestaurantService.list(cuisineId);
RestaurantService.getById(restaurantId);
OrderService.create(payload);
```

**O qualificador volta quando sem ele o nome fica ambíguo ou colide.** Se o `OrderService` também
mexer em item do pedido, aí é `createItem` — porque `create` sozinho não diria mais o quê. Mesma
lógica para `AddressService.findByZipCode`: `find` sozinho não diz por onde se busca.

Verbo que não repete o nome do service já está certo: `AuthService.login()`,
`AuthService.refreshToken()`, `AuthService.getMe()`.

A regra é do método do service. O hook do useCase continua com o nome inteiro
(`useListRestaurants`), porque ele é importado solto e `useList` não diria nada.

## useCases

Um caso de uso por pasta, com o nome da ação (`login/`, `listRestaurants/`). O hook devolve **um
objeto** com nome de domínio, não o retorno cru do React Query:

```ts
export function useLogin() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [AUTH_MUTATION_KEYS.LOGIN],
		mutationFn: AuthService.login
	});

	return {
		login: mutateAsync,
		isLoggingIn: isPending
	};
}
```

O useCase não guarda estado de tela, não navega e não mostra mensagem — quem faz isso é o
controller (`controllers.md`).

## DTO x modelo de domínio

O DTO espelha a API, com os nomes e formatos dela. O modelo de domínio é o que o resto do app
consome, e mora em `shared/models/`.

O mapper é a única ponte entre os dois. **Nenhum DTO atravessa para `presentation/`** — assim
mudança de contrato da API para no mapper em vez de espalhar pelos componentes.

**Mapper só existe quando há transformação de verdade.** Quando o wire já chega no formato do
domínio, não escreva um mapper 1:1: o service tipa a resposta com o próprio modelo e devolve. No dia
em que a API divergir do domínio, aí entram o DTO e o mapper — e a mudança fica contida nesse
arquivo, que é o ponto da regra.

## Erros

**O cliente não escreve mensagem de erro.** A myfood-api responde
`{ code, message, details?, requestId }`, e `message` já vem pronta para a tela, em português —
é o `userMessage` do `AppError` de lá. Quando a falha não é acionável pelo usuário, o backend já
manda um genérico.

`data/config/apiError.ts` tem os dois acessos: `getApiErrorMessage(error)` para exibir e
`getApiErrorCode(error)` para ramificar. Não existe mapa de código para texto no app — se faltar
mensagem para um caso, o conserto é na `myfood-api`.

As únicas strings de erro que moram aqui são os fallbacks: quando **não há resposta** (rede fora,
timeout) e quando o erro nem veio do axios. Nesses casos não existe mensagem do backend para
mostrar.

`API_ERROR_CODES` espelha o `code` que o `error-handler.ts` da API emite. Ao mexer nele, confira a
fonte lá — nada liga os dois arquivos automaticamente.

### Sem interceptor de erro

O axios **não** intercepta erro para exibir nada. Interceptor que mostra toast tira do controller a
chance de não mostrar — e existem casos assim: um 404 esperado numa busca, um 409 que vira merge em
vez de aviso. O tratamento fica no `catch` da chamada, no controller.

O único interceptor de resposta que deve existir é o de **401**, e ele não exibe nada: só renova a
sessão e, se a renovação falhar, encerra. **Ele ainda não existe** — nasce junto com o
`AuthProvider`, não antes.

### Atraso proposital em dev

`EXPO_PUBLIC_REQUEST_DELAY_MS` atrasa toda request, para estado de carregando ficar visível o
suficiente para ser conferido. Fica desligado por padrão (`0` no `.env.example`).

O interceptor de request que o aplica nasce com duas guardas: `__DEV__` no `env.ts`, que zera o
valor fora de dev, e `__DEV__` no ponto de registro em `api.ts`. Uma guarda sozinha não basta: a do
`api.ts` impede o registro, a do `env.ts` impede que um `.env` esquecido atrase produção se alguém
passar a ler `requestDelayMs` em outro lugar.

## Sessão

Quando a sessão entrar: token no `expo-secure-store` via `data/libs/AuthTokensManager.ts`, e o
interceptor de 401 em `api.ts` instalado pelo `AuthProvider` só enquanto existe sessão.

Três detalhes que não são opcionais quando isso for escrito:

- **A promise do refresh é compartilhada.** Cinco requests tomando 401 juntas disparam **um**
  refresh; as outras esperam a mesma promise.
- **O header é reaplicado antes do replay.** O `config` que volta no erro já tem o `Authorization`
  antigo materializado — repetir a request sem sobrescrever manda o token expirado de novo.
- **401 depois de renovar desloga.** Sem esse ramo a sessão fica viva e quebrada.

`login` e `refresh-token` saem pelo `publicApi`, a instância **sem** interceptor. Não é estilo: se o
refresh saísse pelo `api`, um 401 nele reentraria no interceptor e travaria esperando a própria
promise.
