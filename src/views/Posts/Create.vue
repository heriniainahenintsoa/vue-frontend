<script setup>
import Errors from "@/components/Errors.vue";
import { usePostsStore } from "@/stores/posts";
import { reactive } from "vue";
const formData = reactive({
  title: "",
  body: "",
});
const postsStore = usePostsStore();
const onSubmit = () => {
  postsStore.createPost(formData);
};
</script>
<template>
  <h1 class="pageTitle text-center">Create a new post</h1>
  <form
    @submit.prevent="onSubmit"
    class="rounded-lg border-2 p-6 max-w-lg mx-auto mt-6 space-y-4"
  >
    <div class="formGroup">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        :class="['formInput', { inputError: postsStore.errors.title }]"
        placeholder="Enter your post title"
        v-model="formData.title"
      />
      <div v-if="postsStore.errors.title">
        <Errors :errors="postsStore.errors.title" />
      </div>
    </div>
    <div class="formGroup">
      <label for="body">Content</label>
      <textarea
        id="body"
        name="body"
        rows="6"
        :class="['formInput', { inputError: postsStore.errors.body }]"
        placeholder="Enter your post content"
        v-model="formData.body"
      ></textarea>
      <div v-if="postsStore.errors.body">
        <Errors :errors="postsStore.errors.body" />
      </div>
    </div>
    <button class="formButton" type="submit">Create post</button>
  </form>
</template>
