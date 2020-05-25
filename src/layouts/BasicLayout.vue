<template>
  <a-layout id="components-layout-demo-custom-trigger" class="basic-container">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      width="256px"
    >
      <div class="logo">
        <a class="title-link" @click="handleClick">
          <img :src="titleLogo" v-show="collapsed" />
          <span v-show="!collapsed">信息查询系统</span>
        </a>
      </div>
      <a-menu
        mode="inline"
        :open-keys="openKeys"
        :selected-keys="selectedKeys"
        style="width: 256px"
        @openChange="onOpenChange"
        @click="clickMenuItem"
        theme="dark"
      >
        <a-sub-menu key="/inventory">
          <span slot="title">
            <a-icon type="container" /><span>项目台账</span>
          </span>
          <a-menu-item key="/inventory/search">
            项目台账查询
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="/information">
          <span slot="title">
            <a-icon type="appstore" /><span>其他信息</span>
          </span>
          <a-menu-item key="/information/contacts">
            通讯录查询
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!--<a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      -->
      <global-header :collapsed="collapsed" @toggle="toggle"></global-header>
      <a-layout-content
        :style="{
          minHeight: '280px'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import GlobalHeader from "@/components/GlobalHeader";

/*const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};*/

export default {
  components: {
    GlobalHeader
  },
  data() {
    return {
      collapsed: false,
      titleLogo: require("@/assets/icons/gty_small_logo_sq.png"),
      //  菜单列表
      menuList: [],
      openKeys: [],
      selectedKeys: [],
      rootSubmenuKeys: ["/inventory", "/information"]
    };
  },
  created() {
    //this.getMenuList();
    this.openKeys = [
      this.$route.path.substr(0, this.$route.path.lastIndexOf("/"))
    ];
    this.selectedKeys = [this.$route.path];
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menu");
      if (res.meta.status !== 200) {
        return this.$message.error("获取菜单失败");
      } else {
        this.menuList = res.data;
      }
    },
    clickMenuItem(e) {
      this.selectedKeys = [e.key];
      window.sessionStorage.setItem("selectedKeys", this.selectedKeys);
      this.$router.push(e.key);
    },
    //  只展开一个菜单
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      window.sessionStorage.setItem("openKeys", this.openKeys);
    },
    handleClick() {
      this.$router.push("/inventory/search");
      this.openKeys = [
        this.$route.path.substr(0, this.$route.path.lastIndexOf("/"))
      ];
      this.selectedKeys = [this.$route.path];
    }
  }
};
</script>
<style>
.basic-container {
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 24px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
}

.logo {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
}

.logo .title-link {
  margin: 0px;
  width: 100%;
  color: white;
  text-align: center;
  text-decoration-line: none;
  font-family: "Microsoft YaHei";
}

.logo .title-link > span {
  font-size: 24px;
  letter-spacing: 0.05em;
}

.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
  font-size: 16px !important;
}

.ant-menu-inline > .ant-menu-item {
  font-size: 16px !important;
}
</style>
