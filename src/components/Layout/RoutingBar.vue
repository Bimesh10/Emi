<template>
  <div v-if="meta.show" :class="{ 'navbar-item': true, 'has-dropdown is-hoverable': isChild }">
    <router-link :to="path" :class="isChild ? 'navbar-link' : 'navbar-item'">{{
      meta.title
    }}</router-link>
    <div class="navbar-dropdown" v-if="isChild">
      <template v-for="(item, index) in children" :key="index">
        <router-link :to="`${path}/${item.path}`" class="navbar-item">{{
          item.meta.title
        }}</router-link>
      </template>
    </div>
  </div>
</template>
<script setup>
defineProps(['path', 'meta', 'children', 'isChild'])
</script>
