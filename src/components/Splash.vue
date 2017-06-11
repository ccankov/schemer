<template lang="html">
  <form class='session-form'>
    <h2> Current User: {{ currentUser }}</h2>

    <input v-model='username' placeholder='username'>
    <input v-model='password' type='password'>
    <div class='btns'>
      <button @click='login'>Login</button>
      <button @click='logout'>Logout</button>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: ''
  }),
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser.username
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('')
    },
    logout: function () {
      this.$store.dispatch('')
    }
  }
}
</script>

<style lang="css">
</style>
