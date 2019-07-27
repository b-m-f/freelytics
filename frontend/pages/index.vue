<template>
  <div class="container">
    <input v-model="url" type="text" />
    <button @click="fetchData">Fetch data for {{ url }}</button>

    <div v-if="fetched">
      <h2>Analytics data for {{ lastFetched }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    fetched() {
      return this.$store.state.analytics.fetched
    },
    lastFetched() {
      return this.$store.state.analytics.lastFetched
    },
    url: {
      set(url) {
        this.$store.commit('analytics/updateUrl', url)
      },
      get() {
        return this.$store.state.analytics.url
      }
    }
  },
  methods: {
    fetchData() {
      this.$store.commit('analytics/fetchData')
    }
  }
}
</script>

<style></style>
