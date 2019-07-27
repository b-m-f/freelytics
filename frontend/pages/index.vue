<template>
  <div class="container">
    <a-row :gutter="16" />
    <a-row :gutter="16">
      <a-col :span="9">
        <a-input-search enter-button placeholder="Enter URL to get data" @search="fetchData" />
      </a-col>
    </a-row>

    <div v-if="fetched">
      <h2>Analytics data for {{ lastFetched }}</h2>
      <a-table :data-source="data" :columns="columns" />
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url'
  },
  {
    title: 'Visits',
    dataIndex: 'times_visited',
    key: 'visits'
  }
]

export default {
  computed: {
    columns() {
      return columns
    },
    fetched() {
      return this.$store.state.analytics.fetched
    },
    lastFetched() {
      return this.$store.state.analytics.lastFetched
    },
    data() {
      return this.$store.state.analytics.data.map((val, idx) => {
        val.key = idx
        return val
      })
    }
  },
  methods: {
    fetchData(url) {
      this.$store.dispatch('analytics/fetchData', { url })
    }
  }
}
</script>

<style></style>
