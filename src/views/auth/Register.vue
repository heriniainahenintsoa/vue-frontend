<script setup>
import Errors from "@/components/Errors.vue";
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";
const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const authStore = useAuthStore();
const onSubmit = async () => {
  await authStore.auth("register", formData);
};
</script>
<template>
  <h1 class="pageTitle text-center">Register a new Account</h1>
  <form
    @submit.prevent="onSubmit"
    class="rounded-lg border-2 p-6 max-w-lg mx-auto mt-6 space-y-4"
  >
    <div class="formGroup">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        :class="['formInput', { inputError: authStore.errors.name }]"
        placeholder="Enter your name"
        v-model="formData.name"
      />
      <div v-if="authStore.errors.name">
        <Errors :errors="authStore.errors.name" />
      </div>
    </div>
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
    <div class="formGroup">
      <label for="password_confirmation">Confirm your password</label>
      <input
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        class="formInput"
        placeholder="Confirm your password"
        v-model="formData.password_confirmation"
      />
    </div>
    <button class="formButton" type="submit">Register</button>
  </form>
</template>
