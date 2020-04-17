<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        class="line"
        :to="{ path: '/' }"
      >首页</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 子路由渲染出口 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
