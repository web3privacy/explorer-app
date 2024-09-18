<script setup lang="ts">
import * as yup from 'yup'
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

const { categories: categoriesData, usecases: usecasesData, ecosystems: ecosystemsData } = useData()
const { saveProject } = useProject()

const validationSchema = yup.object().shape({
  categories: yup.array().of(yup.string()).required().min(1),
  usecases: yup.array().of(yup.string()).required().min(1),
  ecosystems: yup.array().of(yup.string()).required().min(1),
  description: yup.string().required(),
})

const { validate, meta, resetForm } = useForm({
  validationSchema,
})

const { value: categories, errorMessage: categoriesError } = useField<string[]>('categories')
const { value: usecases, errorMessage: usecasesError } = useField<string[]>('usecases')
const { value: ecosystems, errorMessage: ecosystemsError } = useField<string[]>('ecosystems')
const { value: description, errorMessage: descriptionError } = useField<string>('description')
const day = ref(new Date(props.project?.product_launch_day || '').getDay())
const month = ref(new Date(props.project?.product_launch_day || '').getMonth())
const year = ref(new Date(props.project?.product_launch_day || '').getFullYear())
const isDead = ref(props.project?.sunset || false)

resetForm({
  values: {
    categories: Array.isArray(props.project?.categories) ? props.project?.categories?.map(c => c.toLowerCase()) : [],
    usecases: Array.isArray(props.project?.usecases) ? props.project?.usecases?.map(u => u.toLowerCase()) : [],
    ecosystems: Array.isArray(props.project?.ecosystem) ? props.project?.ecosystem?.map(e => e.toLowerCase()) : [],
    description: props.project?.description || '',
  },
})

function isFormValid() {
  validate()

  if (meta.value.valid) {
    return true
  }
  else {
    return false
  }
}

function save() {
  saveProject({
    categories: categories.value,
    usecases: usecases.value,
    ecosystem: ecosystems.value,
    description: description.value,
    product_launch_day: (year.value && month.value && day.value) ? new Date(year.value, month.value, day.value).toISOString() : undefined,
    sunset: isDead.value,
  })
}

defineExpose({
  isFormValid,
  save,
})
</script>

<template>
  <div mt-24px>
    <ProjectCreateComponentsSelectChips
      v-model="categories"
      label="Categories"
      required
      :options="categoriesData?.map(cat => ({ label: cat.name, value: cat.id }))"
      placeholder="Add category"
      hint="Choose categories that fits your project"
      :error="categoriesError"
    />
    <ProjectCreateComponentsSelectChips
      v-model="usecases"
      label="Use-cases"
      required
      :options="usecasesData?.map(uc => ({ label: uc.name, value: uc.id }))"
      placeholder="Add use-case"
      hint="What can be your project used for?"
      :error="usecasesError"
    />
    <ProjectCreateComponentsSelectChips
      v-model="ecosystems"
      label="Ecosystems"
      required
      :options="ecosystemsData?.map(ec => ({ label: ec.name, value: ec.id }))"
      placeholder="Add ecosystem"
      hint="Choose ecosystems that is your project part of"
      :error="ecosystemsError"
    />
    <ProjectCreateComponentsInput
      v-model="description"
      lg="w-1/2"
      label="Description"
      text-area
      required
      hint="What kind of technology you use, what are your special features
and why should user use your project."
      placeholder="Write something about your project"
      :error="descriptionError"
    />
    <ProjectCreateComponentsDatePicker
      v-model:day="day"
      v-model:month="month"
      v-model:year="year"
      label="Project launch date"
      hint="Date of project emergence (Optional)"
    />
    <span
      text-16px
      font-400
      lg="text-16px"
    >Other Information
    </span>
    <ProjectCreateComponentsToggle
      v-model="isDead"
      label="Sunset (project is dead)"
      hint="Check if project is currently running and working"
    />
  </div>
</template>
