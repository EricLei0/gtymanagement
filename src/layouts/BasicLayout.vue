<template>
  <a-layout id="components-layout-demo-custom-trigger" class="basic-container">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      width="256px"
    >
      <div class="logo">
        <a href="/account/welcome" class="title-link">
          <img :src="titleLogo" v-show="collapsed" />
          <span v-show="!collapsed">项目管理系统</span>
        </a>
      </div>
      <a-menu
        :default-selected-keys="[202]"
        :default-open-keys="[201]"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <template v-for="item in menuList">
          <a-menu-item v-if="!item.children" :key="item.id">
            <a-icon type="app-store" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.id" :menu-info="item" />
        </template>
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
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
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
import { Menu } from "ant-design-vue";

const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.id" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.icon" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.id">
            <a-icon :type="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
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
};

export default {
  components: {
    GlobalHeader,
    "sub-menu": SubMenu
  },
  data() {
    return {
      collapsed: false,
      titleLogo: require("@/assets/icons/gty_small_logo_sq.png"),
      //  菜单列表
      menuList: [],
      list: [
        {
          key: "1",
          title: "Option 1",
          icon: "folder"
        },
        {
          key: "2",
          title: "Navigation 2",
          icon: "folder",
          children: [
            {
              key: "2.1",
              title: "Navigation 3",
              icon: "folder",
              children: [{ key: "2.1.1", title: "Option 2.1.1" }]
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getMenuList();
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
</style>
