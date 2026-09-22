# MyFood App

App React Native (Expo) do MyFood — o aplicativo **do cliente**, quem pede comida. Consome a
`myfood-api` (repositório irmão `../myfood-api`); o painel de restaurante e entregador é o
`../myfood-dashboard`.

As convenções aqui são as do `myfood-dashboard`, adaptadas ao React Native. Onde este arquivo e o
dele divergirem sem explicação, o dashboard é a referência.

## Verificação — regra que não se negocia

**Depois de qualquer alteração, rode apenas estes dois:**

```bash
yarn typecheck && yarn lint
```

**NUNCA suba o Metro (`yarn start`, `expo start`), nem rode `yarn ios`, `yarn android` ou
`expo prebuild` sem o Pedro pedir explicitamente.** Não é preferência: build e servidor só rodam
quando pedidos, por mais que pareçam a forma óbvia de confirmar que algo funciona.
`typecheck` + `lint` é o fechamento padrão — é o mesmo par que o pre-commit roda, então passar
neles é o que define "pronto".

Pedido explícito é o Pedro escrevendo que quer (`sobe o app`, `roda no simulador`,
`quer ver na tela`). Achar que seria útil não conta; se você julga que rodar é necessário para
provar algo, pergunte em vez de rodar.

Consequência prática: **você não vê a tela**. Cor, espaçamento e alinhamento você acerta pelos
tokens e pelo componente mais próximo que já existe, não por tentativa e erro.

## Stack

- Expo SDK 57 + React Native 0.86 + React 19 + TypeScript strict
- NativeWind 4 (Tailwind **3.4**) + `class-variance-authority` + `tailwind-merge`
- React Query 5 para estado de servidor · axios para transporte
- React Hook Form + Zod 4 para formulário
- React Navigation 7 (native stack) · `@gorhom/bottom-sheet`
- `lucide-react-native` para ícones · `react-native-svg` · `expo-image`
- `expo-secure-store` para os tokens de sessão
- Biome para lint e formatação · yarn 1 · Husky + lint-staged no pre-commit

NativeWind 4 **não** suporta Tailwind 4 — o `tailwindcss` fica na linha 3.4 de propósito. Por isso
os tokens deste app vivem em `tailwind.config.js`, e não num `@theme` de CSS como no dashboard.

Não há framework de teste no projeto, por decisão — a verificação é typecheck + lint.

## Comandos

| Comando          | O que faz                                    |
| ---------------- | -------------------------------------------- |
| `yarn typecheck` | `tsc --noEmit`                                |
| `yarn lint`      | `biome check .`                               |
| `yarn format`    | `biome check --write .` (corrige e formata)   |
| `yarn start`     | Metro — **só se pedido**                      |
| `yarn ios`       | Build nativo e run no simulador — **só se pedido** |
| `yarn android`   | Build nativo e run no Android — **só se pedido** |

`EXPO_PUBLIC_API_URL` é obrigatória: `data/config/env.ts` lança se ela faltar. Copie o
`.env.example` para `.env`. Em device físico, troque `localhost` pelo IP da máquina.

`EXPO_PUBLIC_REQUEST_DELAY_MS` atrasa toda request de propósito, para dar tempo de ver skeleton e
loading com a API local. Vale **só** em desenvolvimento (`env.ts` zera fora dele); `0` desliga.

## Arquitetura

Três camadas no topo de `src/`, cada uma com alias próprio:

| Camada          | Alias            | Responsabilidade                                                    |
| --------------- | ---------------- | ------------------------------------------------------------------- |
| `data/`         | `data/*`         | Só dados e mundo externo: endpoints, clients, DTOs, mappers, storage |
| `presentation/` | `presentation/*` | Screens, componentes, layouts e a lógica deles (controllers)         |
| `shared/`       | `shared/*`       | Navegação, utilitários, constantes, entidades e hooks compartilhados |

Dependência anda numa direção só:

- `presentation/` importa de `data/` e `shared/`.
- `data/` importa de `shared/`. **Nunca** de `presentation/`. E só conhece React nos useCases e
  nos contexts.
- `shared/` não importa de nenhuma das outras duas.

Uma screen não importa de outra screen.

`src/styles/global.css` é a quarta pasta de topo e existe só para as três diretivas do Tailwind que
o `metro.config.js` consome. Nada mais entra ali.

Entre camadas ou pastas diferentes, use o alias (`import { cn } from 'shared/utils/cn'`). Dentro da
mesma pasta, caminho relativo (`./AppTextTypes`).

O alias é **sem `@`**, igual ao dashboard, e vive só no `tsconfig.json`. O Metro resolve por ele
antes de olhar `node_modules` — então `data/config/api` nunca vai parar num pacote de mesmo nome.
Não existe cópia do alias no `babel.config.js`; `experiments.tsconfigPaths` no `app.json` é o que
liga isso (e já é o default do SDK 57).

## Padrões globais

- Named export sempre. `export default` só em `App.tsx`, porque o `registerRootComponent` exige.
- **Função é declarada, não atribuída.** No corpo do arquivo é `function x() {}`, nunca
  `const x = () => {}`. Arrow function só como argumento — callback de `.map`, de hook, de evento.
- Toda `interface` começa com `I`. `type` fica para o que interface não expressa (union, mapped
  type) e **não** leva prefixo — é por isso que `AppRoutesParamList` é `type`: o React Navigation
  exige index signature implícita, e interface não tem.
- Tipos de um componente ou screen ficam em `<Nome>Types.ts` ao lado; lógica em
  `use<Nome>Controller.ts` ao lado. O `.tsx` fica com JSX.
- **Só renomeie o que é nosso.** Nome de função de lib fica como a lib batizou: nada de
  `handleSubmit: submitForm` na desestruturação. Quem ganha nome novo é a nossa função — o submit
  do formulário é `onSubmit`, e ele entra no `handleSubmit` do react-hook-form.
- Texto só via `AppText`; cor só via `className` ou `COLORS`. Nada de hex literal,
  `StyleSheet.create` ou tamanho de fonte fora da escala.
- `axios`, `useQuery` e `useMutation` vivem exclusivamente em `src/data/`.
- Sem `console.log`, sem `any`, sem `as` para calar o compilador, sem `enum`
  (`erasableSyntaxOnly` está ligado e o build quebra).
- Não crie abstração antecipando requisito hipotético.

## Comentários

**Não escreva comentário nenhum** — nem no `.tsx`, nem no `.css`, nem em config, nem em script.
Nome de variável, de função e de arquivo carregam a intenção.

Quando algo precisa de explicação, ela vai **na conversa com o Pedro**, não no arquivo. Se for
conhecimento que precisa durar, o lugar é este `CLAUDE.md` ou `.claude/rules/` — nunca um
comentário. Ele adiciona comentário por conta própria quando achar pertinente; isso é decisão dele,
não sua.

Se algo só se entende com comentário, o código é que precisa mudar.

## Regras por contexto

As regras detalhadas ficam em `.claude/rules/`. Elas carregam sozinhas quando você **lê** um arquivo
que casa com o `paths` delas — mas ao **criar arquivo novo** esse gatilho não dispara. Então, antes
de criar uma peça, leia a regra correspondente:

| Vou mexer em…                              | Leia                             |
| ------------------------------------------ | -------------------------------- |
| Qualquer `.ts`/`.tsx` em `src/`            | `.claude/rules/core.md`          |
| Screen, componente, layout                 | `.claude/rules/components.md`    |
| Controller (estado, handlers)              | `.claude/rules/controllers.md`   |
| Endpoint, service, useCase, schema         | `.claude/rules/data-layer.md`    |
| Token, cor, tipografia, acessibilidade     | `.claude/rules/design-system.md` |
| Registrar rota, navegar                    | `.claude/rules/navigation.md`    |

## Estado atual do repositório

Sessão do cliente, endereços e descoberta de restaurantes prontos. Verificado com typecheck + lint
— o app **nunca foi executado**.

Navegação: `Navigation` escolhe `AuthStack` (SignIn/SignUp) ou `AppStack` pela sessão. O `AppStack`
tem `AppTabNavigator` (Início · Conta) mais `Restaurant`, `Addresses` e `AddressForm` empilhados. A tab bar é a
nossa `CustomTabBar` — pílula branca flutuante, sem rótulo e sem botão central.

Não existe aba de busca: o campo mora no cabeçalho da `Home`, ao lado do botão de filtros, com as
pills de categoria logo abaixo.

O que existe e serve de molde:

- `data/config/` — `api` (+ `publicApi`, interceptor de 401, atraso de dev), `apiError`
  (com `getApiErrorReason`), `env`, `queryClient`, `viaCepApi`
- `data/contexts/AuthProvider/` + `data/libs/AuthTokensManager.ts` — sessão no `expo-secure-store`
- `data/modules/auth/` — molde de módulo com mutation
- `data/modules/customerAddress/` — **molde de CRUD**: query + 4 mutations que invalidam a listagem,
  e `schemas/addressFormSchema.ts` (schema de módulo, usado por criar e editar)
- `data/modules/discovery/` — **molde de lista paginada** (`useInfiniteQuery`), com busca por
  texto, filtro de culinária e `includeClosed` na mesma query key
- `data/modules/cuisine/` — catálogo de categorias (`/cuisine-categories`), com `staleTime` de 1h
- `data/modules/address/` — consulta de CEP no ViaCEP, com mapper; espelha o módulo homônimo do
  dashboard
- `presentation/components/` — `AppText`, `AppImage`, `Button`, `Input`, `Skeleton`, `EmptyState`,
  `ErrorState`, `ScreenHeader`, `RestaurantCard`, `CustomTabBar`
- `presentation/layouts/ScreenLayout/` — safe area + teclado + scroll, para tela **sem** lista
- `presentation/screens/` — `SignIn` (screen composta), `SignUp`, `Home` (busca + pills + filtros +
  lista paginada com os estados), `Restaurant` (banner, logo, cardápio por categoria), `Account`,
  `Addresses`, `AddressForm` (formulário com auto-preenchimento por CEP)
- `shared/hooks/` — `useDebouncedValue`, `useScreenPadding`
- `shared/entities/` — `ICustomer`, `ICustomerAddress`, `IRestaurantSummary`, `IProductHit`,
  `IAddress`, `IImageUrls`

### Discovery: o que a API filtra e o que ela não filtra

`GET /discovery/restaurants` aceita `q`, `cuisineSlug` e `includeClosed` (default `false`, então
restaurante fechado **não** aparece sem o usuário pedir). O summary traz `cuisines`, que alimenta
tanto o rótulo do card quanto o sentido das pills.

Esses três parâmetros foram adicionados à `myfood-api` para esta tela — não existiam. O
`ListRestaurantsUseCase` de lá lê a cidade inteira antes de paginar, com teto de
`MAX_CITY_ROWS = 500`, porque `isOpenNow` sai do `isOpenAt`, que é regra de domínio em TypeScript.
Ao mexer em qualquer um dos lados, leia o comentário que está naquele arquivo.

### A tela do restaurante precisa de id e slug

`GET /discovery/restaurants/:slug` responde pelo **slug**; `GET /discovery/restaurants/:id/menu`
responde pelo **id**. A rota `Restaurant` carrega os dois como param porque o card da Home já tem
ambos — assim as duas queries disparam em paralelo, em vez de a segunda esperar a primeira.

O cardápio é uma `FlatList` de **categorias**; os produtos de cada uma são `map` dentro da seção,
não uma segunda lista. Categoria tem punhado de itens, e lista virtualizada dentro de lista
virtualizada é o que o React Native manda evitar.

**`q` casa só com o nome do restaurante.** Buscar por prato continua sendo `GET /discovery/search`,
que a API mantém e o app não consome mais.

### A tab bar flutua, então o respiro inferior vem dela

Sendo `absolute`, a `CustomTabBar` não ocupa espaço de layout — o conteúdo rola por baixo. Ela
reporta a própria altura no `onLayout` (`BottomTabBarHeightCallbackContext`) e o
`useScreenPadding()` lê essa altura do `BottomTabBarHeightContext` para usar como `paddingBottom`.
Fora das abas o contexto é `undefined` e o hook cai no inset de safe area, então o mesmo hook serve
tela de aba e tela empilhada. Ver `.claude/rules/design-system.md`.

### Tela com lista não usa ScreenLayout

`ScreenLayout` é um `ScrollView`. Pôr `FlatList` dentro dele aninha duas listas virtualizadas, que
é o que o React Native avisa para não fazer. Tela com lista monta
`<View className='flex-1 bg-gray-50'>` + `FlatList`, e pega o respiro de safe area do
`useScreenPadding()` — o mesmo hook que o `ScreenLayout` usa — no `contentContainerStyle`.

O que **não** existe ainda, e por isso não deve ser referenciado como se existisse:

- **Card de restaurante não é clicável.** Não há tela de restaurante nem cardápio: tocar num card
  não faz nada. É a emenda da próxima fatia (`/discovery/restaurants/:slug` e `.../menu`)
- sem carrinho, checkout, pedido, pagamento ou avaliação
- sem `@gorhom/bottom-sheet` em uso — está instalado desde o scaffold e nunca foi montado
- sem asset: `app.json` não declara ícone nem splash
- `ios/` e `android/` não são versionadas (CNG) e não há `expo-dev-client`

### Pendências conhecidas

- **Login obrigatório na entrada, por decisão.** Trocar para o modelo iFood é mudar `Navigation`.
- **Card depende de borda, não de contraste.** `bg-background` (`#FEFCFC`) e o `bg-white` do card
  diferem em 3 valores por canal; quem separa os dois é a `border-gray-200`.
- **`Skeleton` não pulsa.** É um bloco cinza estático de propósito — ver a regra de design system.
- **Falha de rede no boot desloga visualmente.** `restoreSession` faz `getMe().catch(() => null)`.
- **Não há teste automatizado.** O interceptor de 401 nunca foi exercitado.
- **Telefone sem máscara** no cadastro, e **senha sem revelar**.
- **Não dá para buscar por prato.** A aba de busca saiu e com ela o consumo de `/discovery/search`,
  que era o único jeito de achar restaurante pelo que ele vende. Voltar exige `q` casar com produto
  na API, ou uma tela dedicada.
- **O cardápio não é clicável.** `MenuProductRow` mostra o item e não abre nada: não existe tela de
  produto, complementos nem carrinho. É a emenda da próxima fatia.
- **O filtro só tem um item.** A sheet de filtros existe com `Mostrar fechados` apenas; ela foi
  desenhada para receber mais (faixa de preço, entrega grátis, avaliação) quando a API tiver.
- **A lista de restaurantes ignora `addressId`.** A API aceita o parâmetro e cai no primeiro
  endereço do cliente quando ele não vem. Trocar de endereço na Home exige passar `addressId` e
  colocá-lo na query key.

Quando uma dessas lacunas for preenchida, atualize esta seção. Documentação que ficou falsa
desencaminha a próxima pessoa.

## Idioma

Código, nomes de arquivo e identificadores em **inglês**. Texto de UI e mensagens de commit em
**português**.
