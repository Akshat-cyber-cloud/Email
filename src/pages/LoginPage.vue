<template>
  <div id="LoginPage" class="grid h-screen place-items-center">
    <div class="flex flex-col items-center justify-center">
      <img src="/imgs/email-logo.png" alt="email-login" class="w-60 mb-5" />
      <div class="flex justify-center m-5">
        <button
          @click="login"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
        >
          Login (Local Storage)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user/user-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const login = async (): Promise<void> => {
  await userStore.getUserDetailsFromGoogle({} as any)
  setTimeout(() => {
    router.push('/email')
  }, 200)
}
</script>
