<template>
  <div class="header">
    <!-- 头部左侧Logo和标题 -->
    <a href="#/">
      <img
        class="logo"
        src="@/assets/logo.png"
        width="25px"
      />
      <span class="company">小刀管理系统</span>
    </a>
    <!-- 下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        admin<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "@/api/login";
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          //修改密码
          break;
        case "b":
          logout(
            localStorage.getItem(localStorage.getItem("mgx-msm-token"))
          ).then(response => {
            const resp = response.data;
            if (resp.flag) {
              // 清除本地数据
              localStorage.removeItem("msm-token");
              localStorage.removeItem("msm-user");
              this.$router.push("/login");
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
                duration: 1000
              });
            }
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  /* 上 右 下 左 */
  padding: 0 10px 0 40px;
}
.company {
  position: absolute;
  color: white;
}

/* 下拉菜单 */
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
</style>
