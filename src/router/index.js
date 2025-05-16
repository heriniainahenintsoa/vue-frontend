import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Home from "@/views/Home.vue";
import Create from "@/views/Posts/Create.vue";
import Edit from "@/views/Posts/Edit.vue";
import Show from "@/views/Posts/Show.vue";
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
    // crud
    {
      path: "/posts/create",
      name: "create",
      component: Create,
      meta: {
        auth: true,
      },
    },
    {
      path: "/posts/:id",
      name: "show",
      component: Show,
    },
    {
      path: "/posts/:id/edit",
      name: "edit",
      component: Edit,
      meta: {
        auth: true,
        onwning: true,
      },
    },
  ],
});
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const postsStore = usePostsStore();
  if (from.name == "login" || from.name == "register") {
    authStore.errors = {};
  }
  await authStore.getUser();
  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }
  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }
  if (to.meta.auth) {
    postsStore.errors = {};
  }
});
export default router;
