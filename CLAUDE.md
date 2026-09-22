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
| `shared/`       | `shared/*`       | Navegação, utilitários, constantes, modelos e hooks compartilhados    |

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

O scaffold está montado e verificado (typecheck + lint). O que existe:

- `App.tsx` — fontes Inter, `QueryClientProvider`, `SafeAreaProvider`,
  `GestureHandlerRootView`, `BottomSheetModalProvider` e a `Navigation`
- `src/data/config/` — `api` (+ `publicApi` e o atraso proposital de dev), `apiError`, `env`,
  `queryClient`
- `src/presentation/components/AppText/` — a única porta de entrada de texto, com a escala de
  tipografia inteira
- `src/presentation/screens/Home/` — screen mínima, só para provar que a stack sobe
- `src/shared/navigation/` — `NavigationContainer` + native stack com a `Home`
- `src/shared/constants/colors.ts` — espelho de `tailwind.config.js` para prop que exige valor
- `src/shared/utils/` — `cn` e `sleep`

O que **não** existe ainda, e por isso não deve ser referenciado como se existisse:

- **Nenhum módulo em `data/modules/`.** Não há auth, nem sessão, nem `AuthProvider`, nem
  `AuthTokensManager`. `setAccessToken`/`removeAccessToken` existem em `api.ts` sem ninguém
  chamando, e **não há interceptor de 401** — ele nasce junto com o refresh, não antes
- nenhum `Button`, `Input`, `Skeleton` ou layout de tela; `AppText` é o único componente
- nenhum asset: `app.json` não declara ícone nem splash, então o Expo usa os padrões dele
- as pastas nativas `ios/` e `android/` não são versionadas (CNG) e não há `expo-dev-client` —
  o app roda no Expo Go até alguma lib nativa exigir o contrário

Quando uma dessas lacunas for preenchida, atualize esta seção. Documentação que ficou falsa
desencaminha a próxima pessoa.

## Idioma

Código, nomes de arquivo e identificadores em **inglês**. Texto de UI e mensagens de commit em
**português**.
