
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link to="/">
                <span>Dashboard</span>
              </nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link to="/generate-tracking-script">
                <span>Start tracking your own website</span>
              </nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <a href="https://maximilianehlers.com/using-freelytics-on-ghost/" target="_blank">
                <span>⧉ Using freelytics with GhostCMS</span>
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <a href="https://maximilianehlers.com/using-freelytics-on-wordpress/" target="_blank">
                <span>⧉ Using freelytics with Wordpress</span>
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <a href="https://github.com/b-m-f/freelytics/issues" target="_blank">
                <span>⧉ Improve Freelytics</span>
              </a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Freelytics</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex text-center>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">
        <a href="https://maximilianehlers.com/">Maximilian Ehlers</a>&copy; 2019
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>