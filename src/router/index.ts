// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/package/:id",
    component: () => import("@/views/PackageDetail.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
