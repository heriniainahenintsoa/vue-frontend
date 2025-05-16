<script setup>
import Errors from "@/components/Errors.vue";
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const postsStore = usePostsStore();
const post = ref();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const formData = reactive({
  title: "",
  body: "",
});

const onSubmit = () => {
  postsStore.updatePost(post.value, formData);
};

onMounted(async () => {
  post.value = await postsStore.getPostById(route.params.id);
  if (authStore.user.id !== post.value.user_id) {
    router.push({ name: "home" });
  } else {
    formData.title = post.value.title;
    formData.body = post.value.body;
  }
});
</script>
<template>
  <div
    v-if="postsStore.isLoading"
    class="flex items-center justify-center pt-20"
  >
    <div class="flex flex-row gap-2">
      <div class="size-2 rounded-full bg-neutral-50 animate-bounce"></div>
      <div
        class="size-2 rounded-full bg-neutral-50 animate-bounce [animation-delay:-.3s]"
      ></div>
      <div
        class="size-2 rounded-full bg-neutral-50 animate-bounce [animation-delay:-.5s]"
      ></div>
    </div>
  </div>
  <div v-else>
    <div v-if="post">
      <h1 class="pageTitle text-center">Edit a post</h1>
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
        <button class="formButton" type="submit">Save changes</button>
      </form>
    </div>
    <div v-else>Post not found</div>
  </div>
</template>
