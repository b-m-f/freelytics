<template>
  <div class="container">
    <Row :gutter="16" />
    <Row :gutter="16">
      <Col :span="9">
        <Input enter-button default-value="Enter URL to get data" @search="fetchData" />
      </Col>
    </Row>

    <div v-if="fetched">
      <h2>Analytics data for {{ lastFetched }}</h2>
      <Table :data-source="data" :columns="columns" />
    </div>
  </div>
</template>

<script>
import { Table, Row, Col, Input } from 'ant-design-vue'

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
  components: {
    Table,
    Row,
    Col,
    Input: Input.Search
  },
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
