<template>
  <div class="bg-gray-200 h-screen">
    <header class="bg-black">
      <Navigation />
    </header>
    <main class="mt-6 mx-6 p-6 bg-white">
      <nuxt />
    </main>
  </div>
</template>

<script>
import Navigation from '~/components/navigation'

export default {
  components: {
    Navigation
  }
}
</script>
<style>
</style>
