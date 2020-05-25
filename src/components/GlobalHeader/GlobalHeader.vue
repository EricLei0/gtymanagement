<template>
  <a-layout-header class="layout-header">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggle"
    />
    <div class="user-wraper">
      <div class="user-avator">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>用户名：{{ this.GLOBAL.username }}</span>
          </template>
          <a-avatar
            size="large"
            :style="{ verticalAlign: 'middle', backgroundColor: color }"
          >
            {{ avatorValue }}
          </a-avatar>
        </a-tooltip>
      </div>
      <div class="exit-button">
        <a-button type="primary" @click="logout">
          <a-icon type="poweroff" />退 出
        </a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

export default {
  name: "GlobalHeader",
  props: {
    collapsed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      color: "",
      avatorValue: ""
    };
  },
  created() {
    this.avatorValue = window.sessionStorage
      .getItem("username")
      .substring(0, 1);
    this.color =
      colorList[Math.floor(Math.random() * colorList.length + 1) - 1];
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

<style lang="less">
.layout-header {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.user-wraper {
  padding-right: 24px;
  display: flex;
}

.user-avator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
}
</style>
