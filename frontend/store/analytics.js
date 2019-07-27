export const state = () => ({
  url: '',
  fetched: false,
  lastFetched: ''
})

export const mutations = {
  updateUrl(state, url) {
    state.url = url
  },
  fetchData(state) {
    // fetch
    const newData = {}
    console.log('fetched')

    state.data = newData
    state.fetched = true
    state.lastFetched = state.url
  }
}
