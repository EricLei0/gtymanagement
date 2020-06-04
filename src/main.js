import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import request from "./utils/request";
import global_ from "./components/Global";

import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "file://"
});

Vue.prototype.GLOBAL = global_;

//  axios.defaults.baseURL = "http://127.0.0.1:3000/api";
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

//  通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

Vue.prototype.$http = axios;
Vue.prototype.$request = request;
Vue.prototype.$newAxios = axiosInstance;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
