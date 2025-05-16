import { useAuthStore } from "@/stores/auth";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Home from "@/views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    // auth
    {
      path: "/auth/register",
      name: "register",
      component: Register,
      meta: {
        guest: true,
      },
    },
    {
      path: "/auth/login",
      name: "login",
      component: Login,
      meta: {
        guest: true,
      },
    },
  ],
});
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (from.name == "login" || from.name == "register") {
    authStore.errors = {};
  }
  await authStore.getUser();
  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }
});
export default router;
