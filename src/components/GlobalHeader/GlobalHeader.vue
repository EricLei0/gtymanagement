<template>
  <a-layout-header class="layout-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggle"
    />
    <div class="user-wraper">
      <span class="exit-button">
        <a-button type="primary" @click="logout">
          <a-icon type="poweroff" />退 出
        </a-button>
      </span>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: "GlobalHeader",
  props: {
    collapsed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/user/login");
    }
  }
};
</script>

<style>
.layout-header {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.user-wraper {
  padding-right: 24px;
}
</style>
