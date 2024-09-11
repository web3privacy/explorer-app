export default defineEventHandler(async () => {
  // return $fetch('https://explorer-data.web3privacy.info/')
  return await useStorage('assets:server').getItem('data.json')
})
