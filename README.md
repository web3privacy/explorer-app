# Explorer Front-End
This is the front-end code for explorer.web3privacy.info

Feel free to propose features, additions, or new creations. 

## Front-end Locally
Local installation guidelines:


1. git clone https://github.com/web3privacy/explorer-app
2. cd /explorer-app
3. pnpm install (get [pnpm](https://pnpm.io/next/installation), npm will also work etc)
4. pnpm run dev



## Run Data & Front-end
If you'd like to run any tests and also manipulate the data from [explorer-data](https://github.com/web3privacy/explorer-data), I'd recommend following approach:


1. git clone https://github.com/web3privacy/explorer-app
2. git clone https://github.com/web3privacy/explorer-data
3. cd /explorer-data
4. make

5. cd ../explorer-app
6. cp .env.example .env # optional
7. echo "LOCAL_DATA_PATH=../explorer-data/dist/index.json" >> .env
8. pnpm install (get [pnpm](https://pnpm.io/next/installation), npm will also work etc)
9. pnpm run dev

Which will allow you to run both the data and the front end.

## Specifications

**Features**

💚 Nuxt 3 - SSR, ESR, File-based routing, components auto importing, modules, etc.

⚡️ Vite - Instant HMR.

🎨 UnoCSS - The instant on-demand atomic CSS engine.

😃 Use icons from any icon sets (Iconify) in Pure CSS, powered by UnoCSS.

🔥 The <script setup> syntax.

🍍 State Management via Pinia

📥 APIs auto importing - for Composition API, VueUse and custom composables.

🏎 Zero-config cloud functions and deploy (Cloudflare Page preset).

🦾 TypeScript, of course.

**Nuxt Modules**
VueUse - collection of useful composition APIs.
ColorMode - dark and Light mode with auto detection made easy with Nuxt.
UnoCSS - the instant on-demand atomic CSS engine.
Pinia - intuitive, type safe, light and flexible Store for Vue.
DevTools - Unleash Nuxt Developer Experience. Vue.

