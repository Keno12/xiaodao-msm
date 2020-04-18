<template>
  <div class="main">
    <app-link v-show="$route.path !== '/home'" />
    <!-- 子路由渲染出口 -->
    <router-view></router-view>
  </div>
</template>
<script>
import AppLink from "./Link.vue";
export default {
  components: { AppLink }
};
</script>
<style scoped></style>
