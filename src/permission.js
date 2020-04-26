import router from "@/router";
import { getUserInfo } from "@/api/login";

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("msm-token");

  if (!token) {
    if (to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      const userInfo = localStorage.getItem("msm-user");
      if (userInfo) {
        next();
      } else {
        getUserInfo(token).then(response => {
          const resp = response.data;
          if (resp.flag) {
            localStorage.setItem("msm-user", JSON.stringify(resp.data));
            next();
          } else {
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
