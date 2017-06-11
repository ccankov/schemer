<template lang="html">
  <form class='session-form'>
    <h2> Current User: {{ currentUser }}</h2>

    <input v-model='username' placeholder='username'>
    <input v-model='password' type='password'>
    <div class='btns'>
      <button @click='login'>Login</button>
      <button @click='signup'>Signup</button>
      <button @click='logout'>Logout</button>
    </div>
  </form>
</template>

<script>
import { LOGIN, LOGOUT, SIGNUP } from '../store/mutation_types'

export default {
  data: () => ({
    username: '',
    password: ''
  }),
  computed: {
    currentUser: function () {
      let user = this.$store.state.currentUser
      return user ? user.username : 'no one'
    }
  },
  methods: {
    login: function (e) {
      e.preventDefault()
      this.$store.dispatch(LOGIN, { user:
      {
        username: this.username,
        password: this.password
      }
      })
    },
    signup: function (e) {
      e.preventDefault()
      this.$store.dispatch(SIGNUP, { user:
      {
        username: this.username,
        password: this.password
      }
      })
    },
    logout: function (e) {
      e.preventDefault()
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>

<style lang="css">
  .session-form {
    position:absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
