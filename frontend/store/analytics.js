export const state = () => ({
  url: '',
  fetched: false,
  lastFetched: '',
  data: []
})

export const mutations = {
  updateUrl(state, url) {
    state.url = url
  },
  setData(state, data) {
    state.lastFetched = state.url
    state.data = data
    state.fetched = true
  }
}

export const actions = {
  async fetchData({ commit, state }) {
    // fetch
    const reponse = await this.$axios.$get(`get/${state.url}`)
    commit('setData', reponse.data)
  }
}
