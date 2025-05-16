<script setup>
import Errors from "@/components/Errors.vue";
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";
const formData = reactive({
  email: "",
  password: "",
});
const authStore = useAuthStore();
const onSubmit = () => {
  authStore.auth("login", formData);
};
</script>
<template>
  <h1 class="pageTitle text-center">Login to your Account</h1>
  <form
    @submit.prevent="onSubmit"
    class="rounded-lg border-2 p-6 max-w-lg mx-auto mt-6 space-y-4"
  >
    <div class="formGroup">
      <label for="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        :class="['formInput', { inputError: authStore.errors.email }]"
        placeholder="Enter your email"
        v-model="formData.email"
      />
      <div v-if="authStore.errors.email">
        <Errors :errors="authStore.errors.email" />
      </div>
    </div>
    <div class="formGroup">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        :class="['formInput', { inputError: authStore.errors.password }]"
        placeholder="Enter your password"
        v-model="formData.password"
      />
      <div v-if="authStore.errors.password">
        <Errors :errors="authStore.errors.password" />
      </div>
    </div>
    <button class="formButton" type="submit">Login</button>
  </form>
</template>
