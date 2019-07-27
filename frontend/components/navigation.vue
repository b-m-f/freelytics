<template>
  <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
    <a-menu-item key="1">
      <nuxt-link to="/">
        <span>Dashboard</span>
      </nuxt-link>
    </a-menu-item>
    <a-menu-item key="2">
      <nuxt-link to="/generate-tracking-script">
        <span>Start tracking your own website</span>
      </nuxt-link>
    </a-menu-item>
    <a-menu-item key="3">
      <a href="https://maximilianehlers.com/using-freelytics-on-ghost/">
        <span>Using freelytics with GhostCMS</span>
      </a>
    </a-menu-item>
    <a-menu-item key="4">
      <a href="https://maximilianehlers.com/using-freelytics-on-wordpress/">
        <span>Using freelytics with Wordpress</span>
      </a>
    </a-menu-item>
  </a-menu>
</template>
<script></script>
<style>
span {
  font-size: 1.1rem;
}
</style>