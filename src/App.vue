<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { FETCH_USER } from './store/mutation_types'

export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch(FETCH_USER)
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

body {
  margin: 0;
  width: 100%;
  min-width: 600px;
}
</style>
