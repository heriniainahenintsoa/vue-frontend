<script setup>
defineProps({
  errors: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div
    v-for="(error, index) in errors"
    :key="index"
    class="text-red-500 text-sm"
  >
    <p>{{ error }}</p>
  </div>
</template>
