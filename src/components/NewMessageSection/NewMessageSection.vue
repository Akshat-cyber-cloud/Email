<template>
  <div
    v-if="newMessageOpen"
    id="NewMessageSection"
    class="md:h-[560px] md:w-[550px] h-[400px] w-[280px] overflow-hidden absolute bottom-5 right-0 mr-20 rounded-t-lg shadow-2xl bg-white"
  >
    <div
      class="flex items-center justify-between rounded-t-lg w-full text-sm px-3.5 py-2.5 bg-gray-200"
    >
      <h2>New message</h2>
      <close-icon @click="emit('updateNewMessageOpen', false)" class="cursor-pointer" :size="19" />
    </div>
    <div class="relative flex items-center px-3.5 py-2">
      <p class="text-sm text-gray-700">To:</p>
      <input
        v-model="emailData.toEmail"
        class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
        type="text"
      />
      <div class="absolute border-b w-[calc(100%-30px)] bottom-0" />
    </div>
    <div class="relative flex items-center px-3.5 py-2">
      <p class="text-sm text-gray-700">Subject:</p>
      <input
        v-model="emailData.subject"
        class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
        type="text"
      />
      <div class="absolute border-b w-[calc(100%-30px)] bottom-0" />
    </div>
    <div class="relative flex items-center px-3.5 py-2">
      <p class="text-sm text-gray-700">Timer (sec):</p>
      <input
        v-model="timerValue"
        class="w-full h-6 border-transparent border-none focus:ring-0 outline-none"
        type="number"
        min="0"
      />
      <div class="absolute border-b w-[calc(100%-30px)] bottom-0" />
    </div>
    <div class="m-1">
      <textarea
        v-model="emailData.body"
        style="resize: none"
        class="w-full border-transparent border-none focus:ring-0 outline-none"
        rows="10"
      ></textarea>
    </div>

    <div v-if="showAllDone" class="px-4 text-green-600 font-bold">All done!</div>
    
    <div class="p-4 mt-2">
      <button
        @click="sendEmail"
        :disabled="isCountingDown"
        class="bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full disabled:bg-gray-400"
      >
        <span v-if="isCountingDown">Sending in {{ timerValue }}s...</span>
        <span v-else>Send message</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { type ISendEmailData } from '@/shared/types/email'
import { useUserStore } from '@/stores/user/user-store'
import { reactive, ref } from 'vue'
import { emailValidator } from '@/shared/lib/helpers/emailValidator'

const { newMessageOpen } = defineProps<{
  newMessageOpen: boolean
}>()

const emit = defineEmits<{
  updateNewMessageOpen: [value: boolean]
}>()

const userStore = useUserStore()
const emailData = reactive<ISendEmailData>({
  toEmail: '',
  subject: '',
  body: ''
})

const timerValue = ref<number>(0)
const isCountingDown = ref<boolean>(false)
const showAllDone = ref<boolean>(false)

const sendEmail = async (): Promise<void> => {
  emailValidator(emailData.toEmail)

  if (timerValue.value > 0) {
    isCountingDown.value = true
    const interval = setInterval(async () => {
      timerValue.value--
      if (timerValue.value <= 0) {
        clearInterval(interval)
        await performSend()
      }
    }, 1000)
  } else {
    await performSend()
  }
}

const performSend = async () => {
  await userStore.sendEmail({
    toEmail: emailData.toEmail,
    subject: emailData.subject,
    body: emailData.body
  })

  // Show "All done" message
  isCountingDown.value = false
  showAllDone.value = true

  setTimeout(() => {
    emit('updateNewMessageOpen', false)
    emailData.toEmail = ''
    emailData.subject = ''
    emailData.body = ''
    timerValue.value = 0
    showAllDone.value = false
  }, 1000)
}
</script>
