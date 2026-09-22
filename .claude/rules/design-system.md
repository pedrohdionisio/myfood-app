---
paths:
  - "src/presentation/**/*.tsx"
  - "tailwind.config.js"
  - "src/shared/constants/colors.ts"
---

# Design system

O app tem um vocabulário fechado de cor, fonte e tamanho, e ele é o **mesmo do
`myfood-dashboard`** — mesma marca, mesmos nomes de token. Interface nova compõe o que já existe;
ela não inventa token.

A diferença é só o formato: o dashboard declara os tokens em `@theme` no `src/index.css` com
`oklch`; aqui eles vivem em `tailwind.config.js` em hex, porque NativeWind 4 roda em Tailwind 3.4
e o React Native não lê `oklch`. Token novo no dashboard entra aqui convertido — o inverso também.

## Texto

Todo texto passa por `AppText` — nunca `<Text>` do React Native direto.

| Prop      | Valores                                                                                     |
| --------- | ------------------------------------------------------------------------------------------- |
| `size`    | `display` 48 · `titleLg` 32 · `titleMd` 24 · `titleSm` 18 · `eyebrow` 12 · `bodyLg` 18 · `bodyMd` 16 · `bodySm` 14 · `label` 13 |
| `weight`  | `regular` · `medium` · `semibold` · `bold`                                                    |
| `color`   | `default` (gray-700) · `strong` (900) · `muted` (500) · `subtle` (400) · `inverse` (branco) · `brand` · `destructive` · `success` |
| `align`   | `left` · `center` · `right`                                                                   |

Cada `size` já carrega tamanho, `line-height` e, nos títulos, `letter-spacing`. Não empilhe
`leading-*` nem `tracking-*` por cima.

Precisou de um tamanho fora da escala → **pare e pergunte**. Não escreva `text-[15px]` solto.

A família é uma só (Inter, em quatro pesos). `weight` escolhe a família carregada
(`font-inter-semibold`) — não empilhe `font-bold` por cima do `weight`, porque no React Native o
peso vem do arquivo da fonte, não da propriedade.

Nome de variante é **camelCase** (`titleLg`), nunca hifenizado; a classe que ele mapeia é que é
hifenizada (`text-title-lg`).

## Cor

Fonte única: `tailwind.config.js`, espelhado em `shared/constants/colors.ts`.

```
background #FEFCFC
brand #D73035 · brand-hover #BF222A · brand-strong #A7131F · brand-subtle #FEEBE9
destructive #8A1114 · success #257D41 · warning #9B6700 · info #046CB9
gray 50…950
```

### `background` é token semântico, e é a única divergência do dashboard

Fundo de tela é `bg-background`, **nunca** `bg-gray-50`. O dashboard modela igual: lá o
`--background` é um token próprio que aponta para o `gray-50`; aqui ele aponta para um off-white
um pouco mais claro (`#FEFCFC` contra `#FDF9F9`), a pedido do Pedro.

A escala de cinza em si continua idêntica à do dashboard — a divergência está contida nesse token,
que é exatamente o motivo de ele existir. Mexer no `gray-50` para clarear o fundo teria movido
junto borda, superfície e texto dos dois repositórios.

**Consequência a vigiar:** card é `bg-white` (`#FFFFFF`) sobre esse fundo, então a diferença entre
card e fundo é de 3 valores por canal — quase nada. Quem separa o card hoje é a
`border-gray-200`, não o contraste de superfície. Se um card aparecer sem borda, ele vai sumir no
fundo.

- Em JSX: `className='bg-brand'`, `text-gray-500`, `border-gray-200`.
- Em prop que exige valor (ícone do lucide, `placeholderTextColor`, `shadowColor`):
  `COLORS.gray[600]`.
- Hex literal no meio de um componente é erro. A exceção é `android_ripple`, que precisa de rgba.

Cor nova entra nos **dois** arquivos (`tailwind.config.js` e `colors.ts`) ou em nenhum — eles não
podem divergir, e nada liga um ao outro automaticamente.

### brand x destructive não se misturam

`destructive` (`#8A1114`) é um vinho mais escuro que o vermelho da marca, de propósito. Num produto
de marca vermelha, vermelho destrutivo sempre briga com vermelho primário: se os dois coincidirem,
"Cancelar pedido" e "Confirmar pedido" saem idênticos lado a lado.

Por isso ação destrutiva **não compete como botão preenchido**. Use a variante de contorno quando
ela aparece ao lado da ação principal, e reserve o preenchido para a tela de confirmação, onde ela é
a ação principal.

### Acessibilidade da cor de texto

`gray-500` (`#847D7D`) é o piso de texto secundário — `gray-400` (`#A8A1A0`) reprova WCAG AA sobre
branco. Não clareie texto secundário além disso; `subtle` é para ícone e divisor, não para texto que
precisa ser lido.

## Espaçamento e forma

Escala do Tailwind (`gap-3`, `px-5`, `py-4`, `mt-8`). Raio: `rounded-lg` em botão de ícone,
`rounded-xl` em card e botão. Divisor de lista: `h-px bg-gray-200`.

Valor arbitrário (`py-[14px]`) é aceito quando o design pede um número fora da escala, mas é
exceção — não o default.

Safe area vem de `react-native-safe-area-context`, nunca de constante chutada.

## Ícones

`lucide-react-native`, com `size` e `color` explícitos e `strokeWidth` entre 1.8 e 2. Import
nomeado: só o ícone usado entra no bundle. Ícone decorativo dentro de área clicável não recebe label
próprio; quem descreve a ação é o elemento clicável.

Nada de uma segunda biblioteca de ícones.

## Logo e outros SVG de marca

O Metro não tem transformer de `.svg`, então não se importa um `.svg` como componente. O arquivo
original fica em `src/shared/assets/` como **fonte**, copiado byte a byte do
`myfood-dashboard/src/shared/assets/`, e a versão consumível é um componente `react-native-svg` em
`src/shared/assets/svgs/` — `Logo.tsx` é o molde.

O Biome ignora `**/*.svg` (`biome.json`) de propósito: sem isso o `noSvgWithoutTitle` acusa o
arquivo de marca, e a correção seria editar um asset que precisa continuar idêntico ao do dashboard.

Dentro do componente, o `fill` vem de `COLORS`, não do hex do arquivo: o vermelho do arquivo é
exatamente `COLORS.brand.DEFAULT`, e o `black` das letras "MY" virou `COLORS.gray[900]`. SVG colado
direto no JSX de um componente continua proibido — o lugar é `shared/assets/svgs/`.

## `className` só funciona em componente registrado

O NativeWind converte `className` em `style` apenas nos componentes que passaram por `cssInterop`.
A lista embutida é a do React Native (`View`, `Text`, `Pressable`, `TextInput`, `Image`,
`ActivityIndicator`, `ScrollView`, `FlatList`, `KeyboardAvoidingView`…) mais o `SafeAreaView`.

**Componente de biblioteca não está nessa lista.** `className` nele não vira estilo, não gera erro
de tipo e não reclama em runtime — o componente simplesmente renderiza sem estilo. Foi o que
aconteceria com o `Image` do `expo-image`: a foto sairia sem tamanho, invisível.

Registre uma vez, num componente nosso:

```tsx
const StyledImage = cssInterop(Image, { className: 'style' });
```

`presentation/components/AppImage/` é o molde — toda imagem do app passa por ele, nunca pelo
`expo-image` direto.

Antes de escrever `className` num componente que não é do React Native, confira se ele está
registrado. Dois casos já resolvidos no projeto:

- `Image` do `expo-image` → `AppImage`, com `cssInterop`.
- `GestureHandlerRootView` no `App.tsx` → **sem** `className`. Ele já aplica `flex: 1` quando
  nenhum `style` chega, então o `className='flex-1'` que estava ali não fazia nada e só parecia
  fazer.

O `Animated.View` do React Native também não é registrado — o NativeWind anima por conta própria,
via reanimated. Por isso o `Skeleton` é estático: um pulse escrito às cegas pode sair invisível, e
essa decisão pede alguém olhando a tela.

## Classe precisa ser literal

O Tailwind escaneia o texto do arquivo. Classe montada em runtime não gera CSS:

```tsx
const cls = `text-${size}`;                                 // não gera nada
const cls = size === 'lg' ? 'text-body-lg' : 'text-body-sm'; // certo
```

Por isso listas de variantes guardam a classe completa, não o fragmento.

**NativeWind não reclama de classe que não existe.** `bg-brand-mainn` passa no typecheck e no
Biome e simplesmente não pinta nada. Não há verificador no projeto — então classe nova se confere
contra `tailwind.config.js` no olho, antes de escrever.

## Ordem do className

Layout → box → tipografia → cor → estado:
`flex-row items-center gap-2 rounded-xl px-4 py-3 text-body-md text-gray-700 active:opacity-80`.

O Biome ordena sozinho (`useSortedClasses`) — não brigue com a ordem dele, rode `yarn format`.

## Sem StyleSheet

Estilo é `className`. `StyleSheet.create` não entra no projeto. `style` tem exatamente dois usos
permitidos:

1. **Valor calculado em runtime** — inset de safe area, largura de barra de progresso.
2. **Sombra**, como constante de módulo (`BAR_SHADOW` no `CustomTabBar`).

O segundo merece explicação, porque não é falta de suporte: o NativeWind **tem** plugin de sombra
(`nativewind/dist/tailwind/shadows.js`) e deriva o `elevation` do Android a partir do `boxShadow`.
A sombra explícita ficou porque é a mesma dos apps irmãos, com valores já escolhidos olhando
device, e ninguém conseguiu comparar as duas no aparelho ainda. Virar token `boxShadow` no
`tailwind.config.js` é a evolução natural — mas é mudança que se faz com a tela na frente.

## Tab bar

A tab bar é nossa (`presentation/components/CustomTabBar/`), passada no `tabBar` do
`Tab.Navigator` — não é a barra padrão com `tabBarStyle`. Ela é uma pílula branca flutuante:
`absolute` no rodapé, `rounded-full`, ícone mais um ponto de 4px que só aparece na aba ativa.
Sem rótulo e **sem botão central elevado** — o slot do meio dos apps irmãos não existe aqui.

Por ser `absolute`, ela não ocupa espaço de layout: o conteúdo passa **por baixo** dela. Duas
consequências que andam juntas:

- o `CustomTabBar` reporta a própria altura pelo `BottomTabBarHeightCallbackContext`, no
  `onLayout`;
- o `useScreenPadding()` lê essa altura do `BottomTabBarHeightContext` e a usa como respiro
  inferior. Fora das abas o contexto é `undefined` e ele cai no inset de safe area.

Por isso o hook serve tela de aba e tela empilhada sem precisar saber onde está — e por isso
`useBottomTabBarHeight()` não é usado: ele lança fora de um tab navigator.

## Acessibilidade

Todo elemento clicável leva:

- `accessibilityRole` (`button`, `link`, `tab`…);
- `accessibilityLabel` quando o conteúdo visível não descreve a ação;
- `hitSlop` quando a área tocável é menor que ~44px;
- feedback de toque: `active:opacity-*` no iOS, `android_ripple` no Android.

## Dark mode: ausente de propósito

O app é light-only, como o dashboard — `userInterfaceStyle` está fixo em `light` no `app.json`. Não
adicione classe `dark:` nem leia `useColorScheme` para trocar cor. Quando dark mode entrar de
verdade, é uma decisão única em `tailwind.config.js` e em `colors.ts`.
