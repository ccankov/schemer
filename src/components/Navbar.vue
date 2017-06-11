<template lang="html">
  <nav>
    <div class="left-items">
      <div class="logo">
        <i class="fa fa-database" aria-hidden="true"></i>
        <span class="logo-text">Schemer</span>
      </div>
      <button @click='handleNewDb' class="button">New Database</button>
      <span @click='goToFeatures' class="nav-link">Features</span>
      <span @click='goToAbout' class="nav-link">About Us</span>
    </div>
    <div class="right-items">

    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    handleNewDb: function (e) {
      // this.$router.push({path: 'editor/new', query: { user_id: 'private' }})
      e.preventDefault()
      this.$router.push('/editor')
    },
    goToFeatures: function (e) {
      // this.$router.push({path: 'editor/new', query: { user_id: 'private' }})
      this.$router.push('/features/')
    },
    goToAbout: function (e) {
      // this.$router.push({path: 'editor/new', query: { user_id: 'private' }})
      this.$router.push('/about/')
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/app.scss';

  nav {
    position: fixed;
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    padding: 10px 60px;
    border-bottom: 1px solid $light-gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-items {
    display: flex;

    button {
      display: block;
      border-radius: 5px;
      padding: 0 20px;
      margin: 0 20px;
      margin-left: 60px;
      font-family: $heading;
      font-size: 14px;
      font-weight: bold;
      background-color: $white;
      color: $accent;
      border-color: $accent;
      border-width: 1px;
      border-style: solid;
    }

    button:hover {
      cursor: pointer;
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
    cursor: pointer;
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
    color: $accent;
  }
</style>
