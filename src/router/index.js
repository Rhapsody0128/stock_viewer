import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/Bar",
    name: "Bar",
    component: () => import(/* webpackChunkName: "bar" */ "../views/Bar.vue"),
  },
  {
    path: "/Line",
    name: "Line",
    component: () => import(/* webpackChunkName: "line" */ "../views/Line.vue"),
  },
  {
    path: "/Table",
    name: "Table",
    component: () =>
      import(/* webpackChunkName: "table" */ "../views/Table.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("#"),
  routes,
});

export default router;
