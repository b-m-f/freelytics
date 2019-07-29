export const state = () => ({
  fetched: false,
  lastFetched: '',
  data: []
})

export const mutations = {
  updateUrl(state, url) {
    state.url = url
  },
  setData(state, { data }) {
    state.lastFetched = state.url
    state.data = data
    state.fetched = true
  }
}

export const actions = {
  async fetchData({ commit }, { url }) {
    // fetch
    const reponse = await this.$axios.$get(`get/${url}`)
    commit('setData', { url, data: reponse.data })
  }
}
