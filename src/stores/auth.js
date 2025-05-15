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
        this.user = data.user;
      }
    },
  },
});
