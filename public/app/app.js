
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
  { path: '/projets', component: projects,
    children: [
      {path:"/", component: list_projects},
      {path:":id/edit", component: edit_project }
      {path:"/add", component: add_project }
    ],
  },
  { path: '/abonnements', component: subscriptions },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes:routes,
  linkActiveClass: "active"
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app');

//app.components.diseases.getDiseases();
// Now the app has started!
