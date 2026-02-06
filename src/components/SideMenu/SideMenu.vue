<template>
  <div id="SideMenu" class="w-52">
    <div
      class="flex items-center justify-center bg-sky-200 w-36 h-5 mt-2 rounded-2xl ml-2 p-4 md:p-6 cursor-pointer"
    >
      <pencil-outline-icon :size="25" class="mr-4" />
      <span class="text-sm">Compose</span>
    </div>
    <div class="my-5"></div>
    <router-link to="/email">
      <div class="flex side-menu-item justify-between px-6 py-1.5 bg-blue-100 rounded-r-full">
        <div class="flex items-center">
          <inbox-icon :size="17" />
          <p class="text-sm pl-4 font-semibold">Inbox</p>
        </div>

        <p class="grid place-items-center ml-2 text-sm">{{ userStore.emails.length }}</p>
      </div>
    </router-link>
    <div class="flex side-menu-item justify-between px-6 py-1.5">
      <div class="flex items-center">
        <star-outline-icon :size="17" />
        <p class="text-sm pl-4">Starred</p>
      </div>
    </div>
    <div class="flex side-menu-item justify-between px-6 py-1.5">
      <div class="flex items-center">
        <clock-outline-icon :size="17" />
        <p class="text-sm pl-4">Snoozed</p>
      </div>
    </div>
    <router-link to="/email/sent">
      <div class="flex side-menu-item justify-between px-6 py-1.5">
        <div class="flex items-center">
          <send-outline-icon :size="17" />
          <p class="text-sm pl-4">Sent</p>
        </div>
      </div>
    </router-link>
    <div class="flex side-menu-item justify-between px-6 py-1.5">
      <div class="flex items-center">
        <file-outline-icon :size="17" />
        <p class="text-sm pl-4">Drafts</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue'
import InboxIcon from 'vue-material-design-icons/Inbox.vue'
import StarOutlineIcon from 'vue-material-design-icons/StarOutline.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import SendOutlineIcon from 'vue-material-design-icons/SendOutline.vue'
import FileOutlineIcon from 'vue-material-design-icons/FileOutline.vue'
import { useUserStore } from '@/stores/user/user-store'
const userStore = useUserStore()
</script>

<style scoped>
.side-menu-item {
  @apply w-[90%];
}
</style>
