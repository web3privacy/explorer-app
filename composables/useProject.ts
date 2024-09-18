import { Buffer } from 'buffer'
import type { Project } from '~/types'

export const useProject = defineStore('project', () => {
  const project = ref<Partial<Project>>()
  const projectImage = ref<File>()
  const isPublishing = ref(false)

  const { getProjectById } = useData()

  function setProject(id: string) {
    project.value = getProjectById(id, { shallow: false }) as Project
  }

  function clearProject() {
    project.value = undefined
  }

  function saveProject(data: Partial<Project>) {
    project.value = {
      ...project.value,
      ...data,
    }
  }

  function saveProjectImage(image: File) {
    projectImage.value = image
  }

  async function publishProject() {
    isPublishing.value = true
    try {
      const imageArrayBuffer = await projectImage.value?.arrayBuffer()
      let imageBuffer: Buffer | undefined
      let base64Image: string | undefined

      if (imageArrayBuffer) {
        imageBuffer = Buffer.from(imageArrayBuffer)
        const base64String = imageBuffer.toString('base64')
        base64Image = base64String
      }

      await $fetch(`/api/data`, {
        method: 'POST',
        body: {
          project: project.value,
          image: {
            type: projectImage.value?.type,
            data: base64Image,
          },
        },
      })
    }
    catch (e) {
      console.error(e)
    }
    finally {
      isPublishing.value = false
    }
  }

  return {
    project,
    isPublishing,
    setProject,
    clearProject,
    saveProject,
    saveProjectImage,
    publishProject,
  }
})