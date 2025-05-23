<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
const postsStore = usePostsStore();
const authStore = useAuthStore();
const post = ref();
const route = useRoute();

onMounted(async () => {
  post.value = await postsStore.getPostById(route.params.id);
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
    <div v-if="post" class="border-2 rounded-lg">
      <div class="p-4 border-b-2 flex items-center justify-between">
        <div class="space-y-2">
          <h1 class="text-2xl font-bold">{{ post.title }}</h1>
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
        </div>
        <div
          v-if="authStore.user && authStore.user.id === post.user.id"
          class="flex items-center justify-center gap-2"
        >
          <!-- delete -->
          <form
            @submit.prevent="postsStore.deletePost(post)"
            class="bg-neutral-50 text-neutral-950 p-1 rounded-lg flex items-center justify-center cursor-pointer"
          >
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </form>
          <!-- edit -->
          <RouterLink
            class="bg-neutral-50 text-neutral-950 p-1 rounded-lg flex items-center justify-center cursor-pointer"
            :to="{ name: 'edit', params: { id: post.id } }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
      <p class="p-4">
        {{ post.body }}
      </p>
    </div>
    <div v-else>Post not found</div>
  </div>
</template>
