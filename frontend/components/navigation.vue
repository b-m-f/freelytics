<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Freelytics</span>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <nuxt-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          <span>Dashboard</span>
        </nuxt-link>
        <nuxt-link
          to="/generate-tracking-script"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          <span>Start tracking your own website</span>
        </nuxt-link>
        <a
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          href="https://maximilianehlers.com/using-freelytics-on-ghost/"
        >
          <span>Using freelytics with GhostCMS</span>
        </a>
        <a
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          href="https://maximilianehlers.com/using-freelytics-on-wordpress/"
        >
          <span>Using freelytics with Wordpress</span>
        </a>
      </div>
      <div></div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style></style>