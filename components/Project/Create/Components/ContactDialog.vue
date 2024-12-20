<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const { modelValue } = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', nickname: string): void
}>()

const userInput = ref('')

const closeDialog = () => {
  emit('update:modelValue', false)
}

const handleConfirm = () => {
  emit('confirm', userInput.value)
  closeDialog()
}
</script>

<template>
  <TransitionRoot
    appear
    :show="modelValue"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="closeDialog"
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
        <div class="flex min-h-full items-center justify-center p-4">
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
              class="w-full max-w-xl transform overflow-hidden border-app-white border-2px bg-black p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-app-white"
              >
                Thanks for keeping Explorer up to date!
              </DialogTitle>
              <div class="mt-2 flex flex-col gap-4">
                <p class=" text-sm text-app-text-white">
                  Your changes will be published as a public PR on Web3Privacy Now GitHub repository and reviewed by our community.
                </p>
                <p class=" text-sm text-app-text-white">
                  This could take up to 48 hours to process new informations and update project's profile.
                </p>
                <p class=" text-sm text-app-text-white">
                  How can we contact you? (Optional)
                </p>
              </div>
              <div class="mt-4">
                <input
                  v-model="userInput"
                  type="text"
                  placeholder="We collect this to track and reward our contributors in the future"
                  class="w-full border border-2 border-app-bg-dark_grey p-2 text-app-white"
                  bg-app-black
                >
              </div>
              <div class="mt-4 flex flex-wrap gap-4">
                <div class="w-full md:w-fit">
                  <Button
                    flex
                    uppercase
                    w-full
                    border
                    @click="closeDialog"
                  >
                    <span>cancel</span>
                  </Button>
                </div>
                <div class="w-full md:w-fit">
                  <Button
                    flex
                    uppercase
                    w-full
                    lg="flex-1 justify-center"
                    inverted-color
                    border
                    @click="handleConfirm()"
                  >
                    <span>confirm changes</span>
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
