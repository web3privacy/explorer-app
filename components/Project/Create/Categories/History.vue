<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  project?: Partial<Project>
}>()

type Event = {
  title: string
  description: string
  link: string
  time: string
}

function useEvents(project?: Partial<Project>) {
  const events = ref<Event[]>(project?.history as Event[] || [])
  const newEvent = reactive<Event>({
    title: '',
    description: '',
    link: '',
    time: '',
  })

  const day = ref<number>()
  const month = ref<number>()
  const year = ref<number>()

  function addEvent() {
    events.value.push({ ...newEvent })
    newEvent.title = ''
    newEvent.description = ''
    newEvent.link = ''
    newEvent.time = ''
    day.value = undefined
    month.value = undefined
    year.value = undefined
  }

  function removeEvent(index: number) {
    events.value.splice(index, 1)
  }

  return {
    events,
    newEvent,
    day,
    month,
    year,
    addEvent,
    removeEvent,
  }
}

const { events, newEvent, addEvent, removeEvent, day, month, year } = useEvents(props.project)

watch([day, month, year], () => {
  const yearValue = year.value
  const monthValue = month.value
  const dayValue = day.value

  if (!yearValue || !monthValue || !dayValue) {
    return null
  }
  newEvent.time = new Date(yearValue, monthValue - 1, dayValue).toString()
})

function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const { useProject } = useData()
const { saveProject } = useProject()

function save() {
  saveProject({
    history: events.value,
  })
}

defineExpose({
  save,
})
</script>

<template>
  <div mt-24px>
    <ProjectCreateComponentsItem
      v-for="event in events"
      :key="event.title"
      @remove="() => removeEvent(events.indexOf(event))"
    >
      <template #label>
        <div
          flex
          gap-2px
        >
          <span
            class="text-app-black text-14px font-700"
            lg="text-16px"
          > {{ event.title }}
          </span>
        </div>
      </template>
      <template #desc>
        <span
          class="text-app-black/50 text-16px hidden"
          lg="block"
        >{{ formatDate(event.time) }}
        </span>
        <NuxtLink
          :to="event.link"
          hover:text-app-black
          class="text-app-black/50 text-16px hidden"
          lg="block"
        >Link
        </NuxtLink>
      </template>
    </ProjectCreateComponentsItem>
    <ProjectCreateComponentsItemAdd
      button-label="ADD EVENT"
      @add="addEvent()"
    >
      <template #content>
        <div
          flex
          flex-col
          gap-16px
          lg="gap-24px"
        >
          <ProjectCreateComponentsInput
            v-model="newEvent.title"
            lg="w-50%"
            label="Event title"
            placeholder="Enter title of event"
            hint="Specific name of events (or what happened)"
          />
          <ProjectCreateComponentsInput
            v-model="newEvent.description"
            lg="w-50%"
            label="Event description"
            placeholder="Describe this event"
            hint="Detailed description of event (max. 1000 glyphs)"
          />
          <ProjectCreateComponentsInput
            v-model="newEvent.link"
            lg="w-50%"
            label="Event URL"
            placeholder="Enter URL with event details"
            hint="Link to Article, PR or other sources confirming event information"
          />
          <ProjectCreateComponentsDatePicker
            v-model:day="day"
            v-model:month="month"
            v-model:year="year"
            label="Date of event"
            placeholder="When this event happened?"
          />
        </div>
      </template>
    </ProjectCreateComponentsItemAdd>
  </div>
</template>
