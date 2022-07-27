<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <nav-bar/>
  <section class="container mt-3">
    <router-view/>
  </section>
  <b-container :toast="{ root: true }" fluid="sm" position="position-fixed"/>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700;1,900&display=swap')

#app
  font-family: 'Source Sans Pro', sans-serif
  -webkit-font-smoothing: antialiased
</style>
