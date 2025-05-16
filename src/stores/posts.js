import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("posts", {
  state() {
    return {
      errors: {},
      isLoading: false,
    };
  },
  actions: {
    async createPost(formData) {
      this.isLoading = true;
      if (localStorage.getItem("token")) {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          this.router.push({ name: "home" });
        } else {
          this.errors = data.errors;
        }
      }
      this.isLoading = false;
    },
    async getPosts() {
      this.isLoading = true;
      const res = await fetch("/api/posts");
      const data = await res.json();
      this.isLoading = false;
      if (res.ok) {
        return data.posts;
      }
    },
    async getPostById(id) {
      this.isLoading = true;
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      this.isLoading = false;
      if (res.ok) {
        return data.post;
      }
    },
    async deletePost(post) {
      const authStore = useAuthStore();
      if (post.user.id === authStore.user.id && localStorage.getItem("token")) {
        this.isLoading = true;
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          this.router.push({ name: "home" });
        }
        this.isLoading = false;
      }
    },
    async updatePost(post, formData) {
      const authStore = useAuthStore();
      if (post.user.id === authStore.user.id && localStorage.getItem("token")) {
        this.isLoading = true;
        formData.updated_at = new Date();
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          this.errors = {};
          this.router.push({ name: "show", params: { id: post.id } });
        } else {
          this.errors = data.errors;
        }
        this.isLoading = false;
      }
    },
  },
});
