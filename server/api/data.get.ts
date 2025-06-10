import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const { localDataPath } = useRuntimeConfig()
  if (localDataPath) {
    const file = join(process.cwd(), localDataPath)
    const data = await readFile(file, 'utf-8')
    return JSON.parse(data)
  }

  return $fetch('https://explorer-data.web3privacy.info/')
})
