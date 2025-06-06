export const useNavigation = defineStore('navigation', () => {
  const showBar = ref(true)
  const showText = ref(true)

  return {
    showBar,
    showText,
  }
})
