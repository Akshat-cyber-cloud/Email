<template>
  <div id="SingleMessageSection" class="w-full bg-white ml-2 rounded-t-xl h-full shadow-sm">
    <div class="border-b">
      <div class="flex items-center justify-between px-1.5 py-0.5">
        <div class="flex">
          <router-link :to="email.fromEmail === userStore.email ? '/email/sent' : '/email'">
            <base-icon
              iconString="back"
              :iconSize="19"
              iconColor="#636363"
              :text="email.fromEmail === userStore.email ? 'Back to sent' : 'Back to inbox'"
              hoverColor="hover:bg-gray-100"
            />
          </router-link>

          <base-icon
            @click="deleteEmail(email.id)"
            iconString="trash"
            :iconSize="19"
            iconColor="#636363"
            text="Delete"
            hoverColor="hover:bg-gray-100"
            class="ml-3"
          />
        </div>
        <p class="text-xs text-gray-500">1-50 of 153</p>
      </div>
    </div>

    <p class="w-full text-base font-bold ml-20 pt-5">Subject</p>
    <div class="w-full text-sm ml-20 font-light pt-2">
      {{ email.subject }}
    </div>

    <div class="w-full flex">
      <img class="rounded-full mt-8 mx-5 w-10 h-10" src="https://via.placeholder.com/45" />
      <div class="w-full my-4 mx-0.5">
        <div class="font-semibold text-sm mt-4 mb-4">
          <div class="w-full flex justify-between items-center">
            <p>{{ email.fromEmail }}</p>
            <p class="mr-5 text-xs font-normal">{{ email.createdAt }}</p>
          </div>
          <span class="text-xs text-gray-500 font-normal">
            to {{ email.toEmail === userStore.email ? 'me' : email.toEmail }}
          </span>
        </div>
        <p>{{ email.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user/user-store'
import { useRoute, useRouter } from 'vue-router'
import { type EmailId, type IEmail } from '@/shared/types/email'
import moment from 'moment'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const email = ref<IEmail>({
  id: '' as EmailId,
  body: '',
  createdAt: '',
  firstName: '',
  fromEmail: '',
  lastName: '',
  subject: '',
  hasViewed: false,
  toEmail: ''
})

const deleteEmail = async (id: EmailId) => {
  const preventMessage = confirm('Are you sure you want to delete this email?')

  if (preventMessage) {
    await userStore.deleteEmail(id)
  }

  setTimeout(() => {
    router.push('/email')
  }, 200)
}

onMounted(async () => {
  const routeId = route.params.id as EmailId
  const emailData = await userStore.getEmailById(routeId)
  if (emailData) {
    await userStore.emailHasBeenViewed(emailData.id)
    email.value = {
      id: emailData.id,
      body: emailData.body,
      createdAt: moment(emailData.createdAt).format('MMM Do HH:mm'),
      firstName: emailData.firstName,
      fromEmail: emailData.fromEmail,
      lastName: emailData.lastName,
      subject: emailData.subject,
      hasViewed: emailData.hasViewed,
      toEmail: emailData.toEmail
    }
  }
})
</script>
