<template>
  <v-container fluid>
    <v-layout row>
      <form class="w-full flex align-center" @submit.prevent="fetchData">
        <v-flex>
          <v-text-field v-model="url" label="What is your domain name?" required></v-text-field>
          <v-btn class="mr-4" @click.stop.prevent="fetchData">Get Data</v-btn>
        </v-flex>
      </form>
    </v-layout>
    <div v-if="fetched">
      <h2 class="text-3xl">Analytics data for {{ lastFetched }}</h2>
      <AnalyticsTable />
    </div>
  </v-container>
</template>

<script>
import AnalyticsTable from '~/components/AnalyticsTable'

export default {
  components: { AnalyticsTable },
  data(){
    return{
      url:""
    }
  },
  computed: {
    fetched() {
      return this.$store.state.analytics.fetched
    },
    lastFetched() {
      return this.$store.state.analytics.lastFetched
    }
  },
  methods: {
    fetchData() {
      if (this.url) {
        this.$store.dispatch('analytics/fetchData', {
          url: this.url
        })
      }
    }
  }
}
</script>

<style></style>
