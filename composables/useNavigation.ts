export const useNavigaiton = defineStore('navigation', () => {
  const showBar = ref(true)
  const showText = ref(true)

  return {
    showBar,
    showText,
  }
})
