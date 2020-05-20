<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <router-view></router-view>
      <div class="footer">
        <p class="copy-right">Copyright© 2020 广西国土测绘院</p>
        <p class="copy-right">此系统不支持IE浏览器！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  // 总容器样式
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;
  }

  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 16px;
    text-align: center;
  }
}
</style>
