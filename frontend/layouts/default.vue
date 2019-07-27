<template>
  <a-layout id="components-layout-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Navigation />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Navigation from '~/components/navigation'
export default {
  components: {
    Navigation
  },
  data() {
    return {
      collapsed: false
    }
  }
}
</script>
<style>
#components-layout-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
