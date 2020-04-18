# 常见的错误

## 01-登录功能

登录验证	this.$refs.form.validate  中的 form 就是ref 就是表单ref 中的值相当于表单的Id

```vue
<template>
  <div class="login-container">
    <!-- ref 相当于 id，:model 表单数据对象, label-width 表单域标签的的宽度 -->
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">小刀会员管理系统</h2>
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" placeholder="请输入帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入有效账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 350px;
  /* 上下间隙150px, 左右自动 */
  margin: 160px auto;
  /*透明背景色*/
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  /* 圆角 */
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
  overflow: hidden;
}
/* 标题 */
.login-title {
  text-align: center;
  color: #303133;
}
</style>


```

## 02-菜单功能

使用页面布局的时候左侧的菜单 menu 需要开启  :router="true" 起作用

D:\github\VueLean\xiaodao-msm\src\components\AppNavbar\index.vue

```vue
<el-menu
      :router="true"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
```

