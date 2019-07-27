<template>
  <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
    <a-menu-item key="1">
      <nuxt-link to="/">
        <a-icon type="user" />
        <span>Dashboard</span>
      </nuxt-link>
    </a-menu-item>
    <a-menu-item key="2">
      <nuxt-link to="/generate-tracking-script">
        <a-icon type="video-camera" />
        <span>Start tracking your own website</span>
      </nuxt-link>
    </a-menu-item>
    <a-menu-item key="3">
      <a-icon type="upload" />
      <span>nav 3</span>
    </a-menu-item>
  </a-menu>
</template>
<script></script>
<style></style>