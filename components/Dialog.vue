<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = defineModel<boolean>()

defineProps<{
  heading: string
  desc: string
  cta: string
  to: string
}>()
</script>

<template>
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden border-app-white border-2px bg-black p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-center text-lg font-medium leading-6 text-app-white"
              >
                {{ heading }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-center text-sm text-app-text-grey">
                  {{ desc }}
                </p>
              </div>

              <div class="mt-4">
                <Button
                  flex
                  border
                  uppercase
                  @click="navigateTo(to, { replace: true, external: true, open: { target: '_blank' } }); isOpen = false"
                >
                  <span>{{ cta }}</span>
                </Button>
                <Button
                  flex
                  uppercase
                  @click="isOpen = false"
                >
                  <span>Close</span>
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
