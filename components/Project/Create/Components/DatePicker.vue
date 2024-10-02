<script setup lang="ts">
export interface SelectProps {
  label?: string
  hint?: string
  placeholder?: string
  required?: boolean
  modelValue?: any
}

defineProps<SelectProps>()

const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
]
const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i)

const day = defineModel<number>('day')
const month = defineModel<number>('month')
const year = defineModel<number>('year')

const daysInMonth = (month: number, year: number) => {
  const monthObj = months.find(m => m.value === month)
  if (!monthObj) {
    throw new Error(`Invalid month value: ${month}`)
  }
  const monthIndex = months.indexOf(monthObj)
  return new Date(year, monthIndex + 1, 0).getDate()
}

const days = computed(() => {
  if (month.value && year.value) {
    return Array.from({ length: daysInMonth(month.value, year.value) }, (_, i) => i + 1)
  }
  return Array.from({ length: 31 }, (_, i) => i + 1)
})
</script>

<template>
  <div
    flex
    flex-col
    gap-8px
  >
    <label
      v-if="label"
      font-400
      text-14px
      lg:text-16px
      text-app-white
    >
      {{ label }}
      <span
        v-if="required"
        text-app-danger
        text-16px
      >*</span>
    </label>
    <div
      class="flex flex-col"
      gap-8px
      lg="flex flex-row gap-24px"
    >
      <div
        class="flex flex-row"
        lg="w-1/2"
        relative
      >
        <ProjectCreateComponentsSelect
          v-model="day"
          class="w-full!"
          :options="days.map(day => ({ label: day.toString(), value: day }))"
          placeholder="Day"
        />
        <ProjectCreateComponentsSelect
          v-model="month"
          class="w-full!"
          ml--2px
          :options="months.map(month => ({ label: month.label, value: month.value }))"
          placeholder="Month"
        />
        <ProjectCreateComponentsSelect
          v-model="year"
          class="w-full!"
          ml--2px
          :options="years.map(year => ({ label: year.toString(), value: year }))"
          placeholder="Year"
        />
      </div>
      <span
        v-if="hint"
        lg="left-1/2 self-center"
        font-400
        italic
        lg:text-14px
        text-12px
        text-app-white
        opacity-50
      >
        {{ hint }}
      </span>
    </div>
  </div>
</template>
