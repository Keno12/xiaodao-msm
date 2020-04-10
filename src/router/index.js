import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import Layout from "../components/Layout";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "layout",
      component: Layout
    }
  ]
});
