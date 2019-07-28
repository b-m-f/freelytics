<template>
  <div class="container flex flex-col">
    <div class="flex justify-center mb-8">
      <form class="w-full max-w-sm" @submit.prevent="fetchData">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            ref="searchInput"
            placeholder="Enter URL to get data for"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            aria-label="URL to get data for"
          />
          <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            @click.stop.prevent="fetchData"
          >Get Data</button>
        </div>
      </form>
    </div>
    <div v-if="fetched">
      <h2 class="text-3xl">Analytics data for {{ lastFetched }}</h2>
      <Table :values="data" class="w-full">
        <thead class>
          <tr>
            <th scope="col" class="text-xl" style="text-align: left; width: 10rem;">
              <SortLink name="page">Page</SortLink>
            </th>
            <th scope="col" class="text-xl" style="text-align: left; width: 10rem;">
              <SortLink name="visits">Visits</SortLink>
            </th>
          </tr>
        </thead>
        <tbody slot="body" slot-scope="sort">
          <tr v-for="value in sort.values" :key="value.times_visited" class="border">
            <td class="border-r pl-6">{{ value.url}}</td>
            <td class="pl-6">{{ value.times_visited }}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
</template>

<script>
import Table from '~/components/table'

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
    data() {
      return this.$store.state.analytics.data.map((val, idx) => {
        val.key = idx
        return val
      })
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch('analytics/fetchData', {
        url: this.$refs.searchInput.value
      })
    }
  }
}
</script>

<style></style>
