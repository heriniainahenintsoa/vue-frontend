<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
const postsStore = usePostsStore();
const authStore = useAuthStore();
const posts = ref([]);
onMounted(async () => {
  posts.value = await postsStore.getPosts();
});
</script>
<template>
  <div class="pageTitle">Latest posts</div>
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
    <div
      v-if="posts.length > 0"
      class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div v-for="post in posts" :key="post.id" class="border-2 rounded-lg">
        <h2 class="p-4 border-b-2 text-2xl font-bold">
          {{ post.title }}
        </h2>
        <p class="p-4">
          {{
            post.body.length > 100 ? post.body.slice(0, 100) + "..." : post.body
          }}
        </p>
        <div class="p-4 flex items-center justify-between">
          <p class="text-sm text-neutral-400">
            Posted by
            <span class="underline underline-offset-4 text-white">{{
              post.user.name
            }}</span>
            on
            {{
              new Date(post.created_at).toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }}
          </p>
          <RouterLink
            :to="{ name: 'show', params: { id: post.id } }"
            class="py-1 px-2 text-sm font-semibold bg-neutral-50 text-neutral-950 rounded-lg"
            >Read more</RouterLink
          >
        </div>
      </div>
    </div>
    <div v-else>Nothing</div>
  </div>
</template>
