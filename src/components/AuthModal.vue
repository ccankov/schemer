<template lang="html">
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click="stopPropagation">

          <div class="modal-header">
            <slot name="header">
              <h3>{{header}}</h3>
            </slot>
          </div>

          <form class='session-form'>
            <ul>
              <li v-for="error in errors" class="error-text">Invalid username or password</li>
            </ul>
            <input v-model='username' placeholder='Username'>
            <br>
            <input v-model='password' placeholder='Password' type='password'>
            <hr>
            <div class="button-container">
              <button @click='submit'>{{header}}</button>
            </div>
            <small @click="$emit('toggleAuthType')">{{changeAuthText}}</small>
          </form>
          <button class="modal-close" @click="$emit('close')">
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { LOGIN, LOGOUT, SIGNUP, RECEIVE_USER_GRAPHS } from '../store/mutation_types'

export default {
  data: () => {
    return {
      username: '',
      password: ''
    }
  },
  props: [
    'authType'
  ],
  computed: {
    errors: function () {
      return this.$store.state.errors
    },
    header: function () {
      if (this.authType === 'login') {
        return 'Log In'
      } else {
        return 'Sign Up'
      }
    },
    changeAuthText: function () {
      if (this.authType === 'login') {
        return 'Not registered? Sign up here.'
      } else {
        return 'Already have an account? Log in here.'
      }
    }
  },
  methods: {
    stopPropagation: function (e) {
      e.stopPropagation()
    },
    submit: function (e) {
      e.preventDefault()
      if (this.authType === 'login') {
        this.login().then(
          response => {
            this.$emit('close')
            this.$store.dispatch(RECEIVE_USER_GRAPHS)
          },
          err => console.log(err)
        )
      } else {
        this.signUp().then(
          response => {
            this.$emit('close')
            this.$store.dispatch(RECEIVE_USER_GRAPHS)
          },
          err => console.log(err)
        )
      }
    },
    login: function () {
      return this.$store.dispatch(LOGIN, {
        user: {
          username: this.username,
          password: this.password
        }
      }).then(() => this.$router.push('/editor'))
    },
    signUp: function () {
      return this.$store.dispatch(SIGNUP, {
        user: {
          username: this.username,
          password: this.password
        }
      }).then(() => this.$router.push('/editor'))
    },
    logout: function (e) {
      e.preventDefault()
      this.$store.dispatch(LOGOUT)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/app.scss';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 300px;
  margin: 0px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 10px;
  margin-bottom: 48px;
  color: #42b983;
  font-family: $heading;
  color: $accent;
}

.session-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    font-size: 0.6em;
    color: $light-accent;
    padding: 2px 0;
    justify-content: center;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    box-sizing: border-box;
    margin: 10px 0;
    padding: 10px;
    border-radius: 3px;
    background-color: #f7f7f5;
    width: 100%;
    border: 0;

    font-family: $heading;
    font-size: 18px;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80%;
    border: 0;
    border-top: 1px solid #e2e2e2;
    box-sizing: content-box;
  }

  small {
    font-size: 12px;
    color: $accent;
  }

  small:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .button-container {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;

    button {
      width: 100px;
      padding: 10px;
      margin: 0 10px;
    }
  }
}

.modal-close {
  width: 25px;
  height: 25px;
  background-color: $accent;
  color: $white;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: -12.5px;
  right: -12.5px;
  border-width: 3px;
}

.modal-close:hover {
  background-color: $accent;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
