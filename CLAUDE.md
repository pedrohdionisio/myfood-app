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

Stack montada e sessão do cliente funcionando ponta a ponta. Verificado com typecheck + lint — o
app **não foi executado**.

O que existe e serve de molde:

- `App.tsx` — fontes Inter, `QueryClientProvider`, `SafeAreaProvider`, `GestureHandlerRootView`,
  `BottomSheetModalProvider`, `AuthProvider` e a `Navigation`
- `src/data/config/` — `api` (+ `publicApi`, interceptor de 401 e o atraso proposital de dev),
  `apiError`, `env`, `queryClient`
- `src/data/contexts/AuthProvider/` + `src/data/libs/AuthTokensManager.ts` — sessão persistida no
  `expo-secure-store` e restaurada no boot
- `src/data/modules/auth/` — `signIn`, `signUp`, `refreshToken`, `getMe`; é o **molde de módulo de
  data** (types, keys, services, useCases com schema zod)
- `src/presentation/components/` — `AppText` (única porta de texto), `Button`, `Input` (react-hook-form
  por dentro, via `useController`)
- `src/presentation/layouts/ScreenLayout/` — safe area + `KeyboardAvoidingView` + scroll
- `src/presentation/screens/SignIn/` — **molde de screen composta**: a screen só monta
  `SignInHeader` + `SignInForm` + rodapé, e o formulário tem controller próprio. Mesmo desenho da
  `Login` do dashboard
- `src/presentation/screens/SignUp/` — molde de formulário com schema que transforma (zod `.transform`
  + `useForm<Form, unknown, Payload>`); ainda desenha tudo na própria screen
- `src/presentation/screens/Home/` — sessão ativa + sair
- `src/shared/assets/` — `black-red-logo.svg` (fonte, cópia do dashboard) e `svgs/Logo.tsx` (o
  componente `react-native-svg` que as telas usam)
- `src/shared/navigation/` — `Navigation` escolhe `AuthStack` ou `AppStack` pelo estado da sessão
- `src/shared/entities/ICustomer.ts` — modelo de domínio, no mesmo lugar que o dashboard usa

O que **não** existe ainda, e por isso não deve ser referenciado como se existisse:

- **Nada de catálogo.** Sem restaurantes, cardápio, carrinho, endereço, pedido ou pagamento —
  `Home` é uma tela de prova, não a home de verdade
- sem abas: a navegação autenticada é um stack de uma screen só
- sem `Skeleton`, sem `ErrorState`, sem componente de lista vazia — os três estados de tela estão
  escritos na regra mas não têm molde implementado
- sem toast: erro de API aparece como texto abaixo do formulário, no `apiErrorMessage` do controller
- sem asset: `app.json` não declara ícone nem splash, então o Expo usa os padrões dele
- as pastas nativas `ios/` e `android/` não são versionadas (CNG) e não há `expo-dev-client`

### Pendências conhecidas

- **Login obrigatório na entrada, por decisão.** O modelo iFood (navegar deslogado, login só no
  checkout) foi descartado agora porque não há catálogo para proteger. Quando o checkout existir,
  isso vira uma mudança em `Navigation`.
- **Falha de rede no boot desloga visualmente.** `restoreSession` faz `getMe().catch(() => null)`,
  então um blip de rede cai na `AuthStack` mesmo com token válido guardado — o token continua no
  device e o próximo boot restaura. Distinguir 401 de erro de rede resolveria.
- **Não há teste automatizado.** O interceptor de 401 (renovação, replay, corrida e deslogue) nunca
  foi exercitado — nem por teste, nem rodando o app.
- **A senha não tem revelar.** `secureTextEntry` sem olho; se virar requisito, é um `PasswordInput`
  ao lado do `Input`.
- **Telefone sem máscara.** O campo aceita dígito cru e o schema valida 10 ou 11 dígitos. Máscara
  de exibição entra quando houver um util de máscara compartilhado.

Quando uma dessas lacunas for preenchida, atualize esta seção. Documentação que ficou falsa
desencaminha a próxima pessoa.

## Idioma

Código, nomes de arquivo e identificadores em **inglês**. Texto de UI e mensagens de commit em
**português**.
