export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()

  const githubApi = $fetch.create({
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: `Bearer ${appConfig.github.accessToken}`,
    },
  })

  return {
    provide: {
      githubApi,
    },
  }
})
