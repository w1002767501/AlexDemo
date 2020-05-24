import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";
import "./utils/veevalidate-i18n";

Vue.config.productionTip = false;
Axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "htttp://baidu.com";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
