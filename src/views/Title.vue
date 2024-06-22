<template>
  <h3
    class="title is-4 is-spaced bd-anchor-title mt-2 mb-2 has-text-centered"
    :class="{ 'has-text-white': isDark }"
    v-if="title"
  >
    <div class="is-size-7">{{ $route.meta.desc || '' }}</div>
    <!-- <a class="bd-anchor-link" href="#"> # </a>
    <span class="bd-anchor-name"> {{ title }} </span>
    <div class="is-size-7 pl-5">{{ $route.meta.desc || '' }}</div> -->
  </h3>
</template>
<script setup>
import { inject } from 'vue'

const { isDark } = inject('isDark')
defineProps({
  title: {
    type: String
  }
})
</script>
