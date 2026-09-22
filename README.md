# myfood-app

App React Native (Expo) do MyFood — o aplicativo do cliente. Consome a `myfood-api`.

## Rodando

```bash
yarn install
cp .env.example .env
yarn start
```

`EXPO_PUBLIC_API_URL` precisa apontar para a `myfood-api`. Em device físico, troque `localhost`
pelo IP da máquina.

## Verificação

```bash
yarn typecheck && yarn lint
```
