import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Login"),
        meta: { title: "用户登录" }
      }
    ]
  },
  {
    path: "/",
    redirect: "/user/login"
  },
  {
    path: "/account",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/account/center",
        name: "center",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Login"),
        meta: { title: "个人中心" }
      },
      {
        path: "/account/welcome",
        name: "welcome",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/account/welcome"),
        meta: { title: "欢迎登录项目管理系统" }
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to.fullPath);
  document.title = to.meta.title;
  //  to  表示将要访问的路径
  //  from 表示从哪个路径跳转而来
  //  next 是一个函数，表示放行 next()放行  next('/login') 强制跳转
  if (to.path === "/user/login") {
    return next();
  }
  //  获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) {
    return next("/user/login");
  }
  //  token存在，访问指定的路径
  next();
});

export default router;
