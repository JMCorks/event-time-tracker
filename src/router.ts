import Vue from "vue";
import Router from "vue-router";
import Calendar from "./views/Calendar/index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "calendar",
      component: Calendar
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
