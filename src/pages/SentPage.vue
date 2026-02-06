<template>
  <div id="SentPage" class="w-full bg-white ml-5 rounded-t-xl h-full shadow-sm">
    <div class="border-b">
      <div class="flex items-center justify-between px-4 my-3">
        <base-icon
          @click="deleteSelected"
          class="-m-2 -ml-2.5"
          iconString="trash"
          :iconSize="19"
          iconColor="#636363"
          text="Delete selected"
          hoverColor="hover:bg-gray-100"
        />
        <div class="text-xs text-gray-500">Sent Emails</div>
      </div>
    </div>
    <div v-for="email in userStore.sentEmails" :key="email.id">
      <message-row
        :from="'To: ' + email.toEmail"
        :hasViewed="true"
        :subject="email.subject"
        :body="email.body"
        :time="email.createdAt"
        :id="email.id"
        @selected-id="selectedId"
      />
    </div>
    <div v-if="userStore.sentEmails.length === 0" class="text-center mt-10 text-gray-500 text-sm">
      No sent emails found.
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageRow from '@/components/MessageRow/MessageRow.vue'
import { useUserStore } from '@/stores/user/user-store'
import { type EmailId } from '@/shared/types/email'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()

const emailsToDelete = ref<EmailId[]>([])

const selectedId = (e: { id: EmailId; value: boolean }) => {
  if (!emailsToDelete.value.length) {
    emailsToDelete.value.push(e.id)
  } else if (e.value && !emailsToDelete.value.includes(e.id)) {
    emailsToDelete.value.push(e.id)
  } else if (!e.value && emailsToDelete.value.includes(e.id)) {
    const index = emailsToDelete.value.indexOf(e.id)
    if (index > -1) {
      emailsToDelete.value.splice(index, 1)
    }
  }
}

const deleteSelected = () => {
  if (!emailsToDelete.value.length) return

  let res = confirm('Are you sure you want to delete the selected emails?')
  if (res) {
    emailsToDelete.value.forEach(async (id: EmailId) => {
      await userStore.deleteEmail(id)
    })

    emailsToDelete.value = []
  }
}

onMounted(() => {
  userStore.getSentEmails()
})
</script>
