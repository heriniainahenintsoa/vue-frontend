<script setup>
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
const authStore = useAuthStore();
</script>

<template>
  <div
    class="border-2 border-neutral-50 w-full flex items-center justify-between my-4 py-2 px-4 rounded-lg"
  >
    <RouterLink to="/">
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-7"
        >
          <path
            fill-rule="evenodd"
            d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </RouterLink>
    <div v-if="!authStore.user" class="flex items-center justify-center gap-4">
      <RouterLink class="navLink" :to="{ name: 'register' }">
        Register
      </RouterLink>
      <RouterLink class="navLink" :to="{ name: 'login' }"> Login </RouterLink>
    </div>
    <div
      v-else
      class="flex items-center justify-center gap-4 border-2 border-transparent"
    >
      <form @submit.prevent="authStore.logout">
        <button>Logout</button>
      </form>
      <div class="bg-neutral-50 text-neutral-950 py-1 rounded-lg px-2">
        <p>Hello, {{ authStore.user.name }}</p>
      </div>
    </div>
  </div>
</template>
