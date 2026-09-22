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
brand #D73035 · brand-hover #BF222A · brand-strong #A7131F · brand-subtle #FEEBE9
destructive #8A1114 · success #257D41 · warning #9B6700 · info #046CB9
gray 50…950
```

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

Nada de SVG colado no JSX e nada de uma segunda biblioteca de ícones.

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

Estilo é `className`. `style={{}}` só para valor calculado em runtime de verdade — inset de safe
area, largura de barra de progresso. `StyleSheet.create` não entra no projeto.

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
