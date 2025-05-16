<script setup>
import { onMounted } from "vue";
import Layout from "./components/Layout.vue";
import { useAuthStore } from "./stores/auth";
const authStore = useAuthStore();

onMounted(() => {
  authStore.getUser();
});
</script>
<template>
  <Layout>
    <RouterView />
  </Layout>
</template>
