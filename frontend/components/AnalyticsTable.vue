<template>
  <v-card>
    <v-card-title>
      Search by Url
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="30"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Page', value: 'url', align: 'left' },
        { text: 'Visits', value: 'times_visited', align: 'left' }
      ]
    }
  },
  computed: {
    data() {
      return this.$store.state.analytics.data
    }
  }
}
</script>