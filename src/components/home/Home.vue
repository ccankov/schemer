<template>
  <div class='home'>
    <aside class='side-nav'>
      <ul class='home-links'>
        <li @click="$router.push('/editor')"> Design DB </li>
        <li @click="$router.push('/home/features')"> Features </li>
        <li @click="$router.push('/home/about')"> About Us </li>
      </ul>
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
    min-width: 900px;
    display: flex;
    box-sizing: border-box;
  }

  .side-nav {
    height: 100%;
    border-right: 1px solid $gray;
    padding: 0;
    width: 20vw;
    min-width: 300px;
    display: flex;
  }

  .body {
    flex: 1;
    max-width: calc(100%-300px)
  }

  .home-links {
    padding: 0;
    margin: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
  }

  .home-links li {
    box-sizing: border-box;
    border-bottom: 1px solid $gray;
    width: 100%;
    font-family: $heading;
    font-weight: 500;
    padding: 15px 20px;
    font-size: 26px;
    text-align: right;
  }

  .home-links li:hover {
    cursor: pointer;
    background: rgba($accent, 0.3);
    text-decoration: underline;
  }
</style>
