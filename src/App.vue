<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Layout/Navbar.vue'
import { inject } from 'vue'
const { isDark } = inject('isDark')
</script>

<template>
  <div :class="{ 'has-background-black-ter has-text-white': isDark }">
    <div class="container is-fullhd">
      <div class="hero is-fullheight">
        <section class="section p-0" style="padding-bottom: 5% !important">
          <Navbar v-if="$route.meta.title" />
          <Title :title="$route.meta.title || ''" />
          <RouterView />
        </section>
      </div>
    </div>
    <footer class="footer p-3" :class="{ 'has-background-grey-darker has-text-white': isDark }">
      <div class="content has-text-centered">
        <p>
          <strong :class="{ 'has-text-white': isDark }">EMI Calculator</strong> by
          <a href="https://bhavyalollipop.github.io" class="has-text-primary" target="_blank"
            >Bhavya P</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>
<style>
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
