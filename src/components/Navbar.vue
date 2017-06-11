<template lang="html">
  <nav>
    <div class="left-items">
      <div class="logo">
        <i class="fa fa-database" aria-hidden="true"></i>
        <span class="logo-text">Schemer</span>
      </div>
      <button class="button">New Database</button>
      <a href="#" class="nav-link">Features</a>
      <a href="#" class="nav-link">About Us</a>
    </div>
    <div class="right-items">

    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss">
  @import '../assets/app.scss';

  nav {
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    padding: 10px 60px;
    border-bottom: 1px solid $light-gray;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-items {
    display: flex;

    button {
      padding: 0 20px;
      margin: 0 20px;
      margin-left: 60px;
      font-family: $heading;
      font-size: 14px;
      background-color: $white;
      color: $accent;
      border-color: $accent;
    }

    button:hover {
      color: $white;
      background-color: $light-accent;
    }
  }

  .right-items {
    display: flex;
  }

  .logo i {
    font-size: 1.1em;
    color: $accent;
  }

  .logo-text {
    padding: 10px;
    font-size: 1.2em;
    font-weight: bold;
    font-family: $heading;
  }

  .nav-link {
    display: flex;
    align-items: center;
    margin: 0 20px;
    text-decoration: none;
    font-family: $heading;
    font-size: 15px;
    font-weight: bold;
    color: $dark-gray;
  }

  .nav-link:hover {
    color: $gray;
  }
</style>
