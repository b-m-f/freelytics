
<template>
  <div>
    <a-row :type="flex" :justify="space-between">
      <a-col :span="18">
        <h2>Add the following script into your website to get started:</h2>
        <p>For more information see the links in the sidebar</p>
      </a-col>
      <a-col :span="4">
        <a-button
          class="copy-to-clipboard-button"
          data-clipboard-target="#script-area"
        >Copy to clipboard</a-button>
      </a-col>
    </a-row>
    <a-card title="Script">
      <pre>
         <code id="script-area">
            {{script}}
         </code>
       </pre>
    </a-card>
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
