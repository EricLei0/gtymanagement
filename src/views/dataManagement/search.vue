<template>
  <div class="result-page">
    <a-result title="正在开发中，即将开放使用">
      <template #icon>
        <a-icon type="hourglass" theme="twoTone" />
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less">
.result-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
