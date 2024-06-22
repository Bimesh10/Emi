<template>
  <nav class="navbar has-background-info pl-3" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item has-text-weight-bold has-text-white" href="/"> 📖 EMI Calculator </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RoutingBar
          v-for="(route, index) in allRoutes"
          :isChild="!!route.children"
          v-bind="route"
          :key="index"
        />
      </div>
    </div>
    <div class="navbar-end is-clickable">
      <div class="navbar-item">
        <svg
          @click="reset()"
          title="Reset to Default"
          fill="#fff"
          width="16"
          height="16"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 489.645 489.645"
          xml:space="preserve"
          class="mr-3"
        >
          <g>
            <path
              d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
		c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
		c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
		c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
		C414.856,432.511,548.256,314.811,460.656,132.911z"
            />
          </g>
        </svg>
        <span class="mr-3 tag is-small is-size-8" :class="shareTag.color" v-if="shareTag.show">
          {{ shareTag.msg }}
        </span>

        <svg
          v-else
          @click="copyURL()"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#fff"
          class="bi bi-share mr-3"
          viewBox="0 0 16 16"
        >
          <path
            d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 100 100"
          @click="updateTheme(!isDark)"
        >
          <circle cx="50" cy="50" r="50" :fill="!isDark ? '#fff' : '#000'" />
          <circle cx="70" cy="50" r="40" fill="#3e8ed0 " />
        </svg>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import RoutingBar from './RoutingBar.vue'
import { useCopyToClipboard } from '@/helpers/useCommon.js'
const router = useRouter()
const { isDark, updateTheme } = inject('isDark')
const shareTag = ref({
  msg: '',
  color: '',
  show: false
})
const copyURL = async () => {
  const copyText = `${window.location.host}/#?p=${document.getElementById('emidetails0').value}&r=${
    document.getElementById('emidetails1').value
  }&n=${document.getElementById('emidetails2').value}`

  const { msg, color } = await useCopyToClipboard(copyText).then((res) => res)
  shareTag.value = { msg, color }
  shareTag.value.show = true
  setTimeout(() => {
    shareTag.value.show = false
  }, 2500)
}
const reset = () => {
  const currentUrlWithoutParams = window.location.origin + window.location.pathname
  window.location.href = currentUrlWithoutParams
}
const allRoutes = router.options.routes
</script>
