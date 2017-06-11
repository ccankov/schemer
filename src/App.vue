<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { FETCH_USER } from './store/mutation_types'

export default {
  name: 'app',
  created () {
    this.$store.dispatch(FETCH_USER)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
