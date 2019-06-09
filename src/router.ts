import Vue from "vue";
import Router from "vue-router";
import CalendarView from "./views/CalendarView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "calendar"
      }
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
    },
    {
      path: "/events",
      name: "events",
      // Lazy loading
      component: () =>
        import(/* webpackChunkName: "EventView" */ "./views/EventView.vue")
    }
  ]
});
