---
paths:
  - "src/**/*.{ts,tsx}"
---

# Core

Vale para todo arquivo de `src/`. As regras de peça (componente, controller, data, navegação)
somam a esta, não substituem.

## Camadas e imports

```
src/presentation/   screens, components, layouts — só UI
src/data/           config, libs, contexts, modules (types, services, keys, useCases)
src/shared/         navigation, utils, constants, models, hooks, assets
```

Direção permitida: `presentation → data → shared`. Nunca o contrário. Uma screen não importa de
outra screen.

Cruzou fronteira de pasta de topo, use alias; dentro da própria screen ou do próprio módulo de
dados, caminho relativo:

```ts
import { AppText } from 'presentation/components/AppText/AppText';
import { cn } from 'shared/utils/cn';
import { useHomeController } from './useHomeController';
```

O alias é sem `@` (`data/*`, `presentation/*`, `shared/*`) e mora **só** no `tsconfig.json`. Não
existe cópia em `babel.config.js` nem em `metro.config.js` — o Metro lê o `tsconfig` direto e
resolve por ele antes de `node_modules`.

## Interfaces e tipos

**Toda `interface` começa com `I`**: `IAppTextProps`, `IHandleSelectAddressParams`, `IRestaurant`.

Use `interface` para objeto nomeado. `type` fica para o que interface não expressa — union,
interseção, tipo utilitário, mapped type — e **não** leva prefixo.

O caso real onde isso decide: `AppRoutesParamList` é `type` porque o React Navigation exige index
signature implícita, e interface não tem. Trocar para `interface` quebra o `createNativeStackNavigator`.

Tipos de um componente ou screen ficam em `<Nome>Types.ts` ao lado dele. Tipo consumido por mais de
uma camada vai para `shared/entities/`.

## Import de tipo

`verbatimModuleSyntax` está ligado — import de tipo **precisa** de `import type`, senão o build
quebra:

```ts
import { Text } from 'react-native';
import type { IAppTextProps } from './AppTextTypes';
```

## Flags que mudam como se escreve

Ligadas no `tsconfig.json`. Não são opinião, o build falha:

- `strict` — sem `any` implícito, null checado.
- `noUncheckedIndexedAccess` — indexar array/record devolve `T | undefined`. Trate com guard ou
  `?.`; **não** resolva com `as T`.
- `noUnusedLocals` / `noUnusedParameters` — variável ou parâmetro não usado é erro. O Biome repete
  isso como regra de lint.
- `noFallthroughCasesInSwitch` — todo `case` fecha com `break` ou `return`.

O `erasableSyntaxOnly` fica **desligado** no `tsconfig.json`, então o compilador não barra `enum`.
Quem barra é o Biome (`style/noEnum`), e a regra vale igual: **sem `enum`**, sem `namespace` com
runtime, sem parameter properties. No lugar de enum, union de literais com `as const`:

```ts
export const ORDER_STATUS = ['placed', 'preparing', 'delivering', 'delivered'] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];
```

## Funções

**Função é declarada, não atribuída.** No corpo do arquivo é `function x() {}`, nunca
`const x = () => {}`. Arrow function só como argumento — callback de `.map`, de hook, de evento.

**Função de uso local sai do arquivo.** Utilitário ou hook que só aquele componente/screen usa vai
para `utils/<nomeDaFuncao>.ts` ou `hooks/<useNome>.ts` **dentro da pasta do próprio
componente/screen**, importado de lá (`./utils/toFormValues`). No dia em que servir mais de uma
pasta, sobe para `shared/utils` ou `shared/hooks`.

A regra é sobre função. Constante fica onde está — a não ser que exista só para aquela função, e aí
desce junto com ela.

## Proibido

- `any`. Se o tipo é mesmo desconhecido, use `unknown` e estreite.
- `as` para calar o compilador. `as const` e cast em type guard são ok.
- `@ts-ignore` / `@ts-expect-error`. Não há exceção documentada por comentário — o projeto não usa
  comentário. Se aparecer um caso que parece exigir um, traga a discussão.
- `export default` fora de `App.tsx`.
- `console.log`.
- Comentário. Nenhum. Ver `CLAUDE.md`.
