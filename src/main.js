import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 样式
import App from "./App.vue";
import router from "./router";

Vue.use(ElementUI);

//权限拦截
import "./permission";

Vue.config.productionTip = process.env.NODE_ENV === "production";

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");