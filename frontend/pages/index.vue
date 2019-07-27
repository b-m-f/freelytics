<template>
  <div class="container">
    <input v-model="url" type="text" />
    <button @click="fetchData">Fetch data for {{ url }}</button>

    <div v-if="fetched">
      <h2>Analytics data for {{ lastFetched }}</h2>
      <Table :data-source="data" :columns="columns" />
    </div>
  </div>
</template>

<script>
import { Table } from 'ant-design-vue'

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
  components: { Table },
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
    url: {
      set(url) {
        this.$store.commit('analytics/updateUrl', url)
      },
      get() {
        return this.$store.state.analytics.url
      }
    },
    data() {
      return this.$store.state.analytics.data.map((val, idx) => {
        val.key = idx
        return val
      })
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch('analytics/fetchData')
    }
  }
}
</script>

<style></style>
