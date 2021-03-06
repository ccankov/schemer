<template lang="html">
  <nav>
    <div class="left-items">
      <div class="logo" @click='goToHome'>
        <i class="fa fa-database" aria-hidden="true"></i>
        <span class="logo-text">Schemer</span>
      </div>
      <button @click='handleNewDb' class="button">New Database</button>
      <span @click='goToFeatures' class="nav-link">Features</span>
      <span @click='goToAbout' class="nav-link">About Us</span>
    </div>
    <div class="right-items">
      <h4 v-if="loggedIn" class="welcome-text">
        {{userText}}
      </h4>
      <button @click='logout' v-if="loggedIn" class="button">
        Log Out
      </button>
      <button v-if="!loggedIn" @click="showLogIn" class="button">
        Log In
      </button>
      <button v-if="!loggedIn" @click="showSignUp" class="button">
        Sign Up
      </button>
    </div>
    <AuthModal :authType="authType" v-if="showModal" @close="toggleModal" @toggleAuthType="toggleAuthType">
    </AuthModal>
  </nav>
</template>

<script>
import { LOGOUT, SET_NEW_DB, CLEAR_ERRORS } from '../store/mutation_types'
import AuthModal from './AuthModal'
export default {
  data: function () {
    return {
      showModal: false,
      authType: 'login'
    }
  },
  components: {
    AuthModal
  },
  name: 'navbar',
  computed: {
    loggedIn: function () {
      return Boolean(this.$store.state.currentUser)
    },
    userText: function () {
      let user = this.$store.state.currentUser
      if (user) {
        return `Welcome, ${user.username}!`
      }
    }
  },
  methods: {
    toggleAuthType: function () {
      this.$store.commit(CLEAR_ERRORS)
      this.authType = (this.authType === 'login' ? 'signup' : 'login')
    },
    showLogIn: function () {
      this.authType = 'login'
      this.showModal = true
    },
    showSignUp: function () {
      this.authType = 'signup'
      this.showModal = true
    },
    toggleModal: function () {
      this.$store.commit(CLEAR_ERRORS)
      this.showModal = !this.showModal
    },
    logout: function (e) {
      e.preventDefault()
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push('/home')
        this.$store.commit(SET_NEW_DB)
      })
    },
    handleNewDb: function (e) {
      e.preventDefault()
      this.$router.push('/editor')
      this.$store.commit(SET_NEW_DB)
    },
    goToFeatures: function (e) {
      this.$router.push('/home/features')
    },
    goToAbout: function (e) {
      this.$router.push('/home/about')
    },
    goToHome: function (e) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/app.scss';

  nav {
    position: absolute;
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    padding: 10px 60px;
    border-bottom: 1px solid $light-gray;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      display: block;
      border-radius: 5px;
      padding: 0 20px;
      margin: 0 20px;
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

  .left-items {
    display: flex;
    height: 30px;
  }

  .right-items {
    display: flex;
    height: 30px;

    button {
      margin-left: 20px;
    }
  }

  .right-items h4 {
    margin: 0 10px;
    display: flex;
    align-items: center;
  }

  .logo:hover {
    cursor: pointer;
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

  .welcome-text {
    font-family: $heading;
    font-size: 15px;
  }
</style>
