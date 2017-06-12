<template>
  <div class='home'>
    <aside class='side-nav'>
      nav
    </aside>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
  @import '../../assets/app.scss';

  .home {
    padding-top: 60px;
    height: 100%;
    display: flex;
  }

  .side-nav {
    border-right: 1px solid $gray;
    width: 20vw;
    min-width: 300px;
  }

  .body {
    flex: 1;
    max-width: calc(100%-300px)
  }
</style>
