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

Then we should update our data.get.ts file in the explorer-app directory, continue the commands as following:

5. cd ..
6. cd /explorer-app
7. cd server/api

There's a file called: data.get.ts

And you can replace the contents with:

```
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async () => {
  // Define the path to the local JSON file
  const filePath = path.join('../explorer-data/dist', 'index.json');

  // Read the file asynchronously
  const data = await fs.promises.readFile(filePath, 'utf-8');

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Return the parsed JSON data
  return jsonData;
});
```

After which you go back to your terminal:

8. cd ../../
9. pnpm install (get [pnpm](https://pnpm.io/next/installation), npm will also work etc)
10. pnpm run dev

Which will allow you to run both the data and the front end.

### Environment variables
Copy `.env.example` to `.env` and fill in your GitHub app credentials so the application can create pull requests:

```
GITHUB_APP_ID=<your app id>
GITHUB_APP_PRIVATE_KEY=<contents of the pem file>
GITHUB_INSTALLATION_ID=<installation id>
GITHUB_OWNER=<org or user>
GITHUB_BASE_BRANCH=main
GITHUB_REPO=<repository>
```



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

