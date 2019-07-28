
<template>
  <div>
    <div class="flex mb-8">
      <div>
        <h2 class="text-3xl">Add the following script into your website to get started:</h2>
        <p class="text-lg">For more information see the links in the sidebar</p>
      </div>
      <button
        class="copy-to-clipboard-button p-2 border ml-32 text-3xl border-black border-4 rounded-sm"
        data-clipboard-target="#script-area"
      >Copy to clipboard</button>
    </div>
    <div>
      <div class="border">
        <h3 class="text-2xl p-6">Script</h3>
      </div>
      <div class="border">
        <pre class="m-6 p-4 bg-gray-100 border border-black border-4">
         <code id="script-area">
            {{script}}
         </code>
       </pre>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

if (process.browser) {
  new Clipboard('.copy-to-clipboard-button') // eslint-disable-line no-new
}
function createScript(url) {
  const l = document.createElement('a')
  l.href = window.location.href

  function sendDataToApi(apiUrl, data) {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open('POST', apiUrl)
    xmlhttp.setRequestHeader('Content-Type', 'application/json')
    xmlhttp.setRequestHeader('Accept', 'application/json')
    xmlhttp.send(data)
  }

  function getPath() {
    return l.href
  }

  function getHost() {
    return l.hostname
  }

  const path = getPath()
  const host = getHost()
  const body = JSON.stringify({ url: path, root: host })
  const apiUrl = `${url}/save`

  if ('fetch' in window) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
  } else {
    sendDataToApi(apiUrl, body)
  }
}

export default {
  computed: {
    script() {
      return `
  (${createScript}("${this.$axios.defaults.baseURL}"))
  `
    }
  }
}
</script>

<style></style>
