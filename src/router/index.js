import Vue from "vue";
import VueRouter from "vue-router";
import beforeEach from "./beforeEach";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/Home"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/auth/Auth"),
  },
  {
    path: "/main",
    name: "Main",
    meta: { authRequired: true },
    component: () => import("../views/main/Main"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(beforeEach);

export default router;
