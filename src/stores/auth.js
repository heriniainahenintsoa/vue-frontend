import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth-store", {
  state: () => {
    return {
      user: null,
      isLoading: false,
      errors: {},
    };
  },
  actions: {
    async auth(apiRoute, formData) {
      const res = await fetch(`/api/auth/${apiRoute}`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        this.errors = data.errors;
      } else {
        localStorage.setItem("token", data.token);
        this.user = data.user;
        this.errors = {};
        this.router.push({ name: "home" });
      }
    },
    async getUser() {
      if (localStorage.getItem("token")) {
        const res = await fetch(`/api/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          this.user = data;
          this.errors = {};
        }
      }
    },
    async logout() {
      if (localStorage.getItem("token")) {
        const res = await fetch("/api/auth/logout", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "DELETE",
        });
        if (res.ok) {
          this.user = null;
          localStorage.removeItem("token");
          this.router.push({ name: "home" });
        }
      }
      this.errors = {};
    },
  },
});
