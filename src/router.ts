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
        import(/* webpackChunkName: "EventView" */ "./views/EventsView.vue")
    },
    {
      path: "/persons",
      name: "persons",
      // Lazy loading
      component: () =>
        import(/* webpackChunkName: "PersonsView" */ "./views/PersonsView.vue")
    },
    {
      path: "/scales",
      name: "scales",
      // Lazy loading
      component: () =>
        import(/* webpackChunkName: "ScalesView" */ "./views/ScalesView.vue")
    },
    {
      path: "/manage-contest",
      name: "manage-contest",
      // Lazy loading
      component: () =>
        import(/* webpackChunkName: "ManageContestsView" */ "./views/ManageContestsView.vue")
    },
    {
      path: "/contests",
      name: "contests",
      // Lazy loading
      component: () =>
        import(/* webpackChunkName: "ContestsView" */ "./views/ContestsView.vue")
    },
    {
      path: "/contest/:id",
      name: "contest",
      // Lazy loading
      component: () =>
        import(/* webpackChunkName: "ContestView" */ "./views/ContestView.vue")
    }
  ]
});
