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

          <div class="modal-body">
            <slot name="body">
              <form class='session-form'>
                <input v-model='username' placeholder='username'>
                <input v-model='password' type='password'>
                  <button @click='submit'>{{header}}</button>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <span @click="$emit('toggleAuthType')">{{changeAuthText}}</span>
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { LOGIN, LOGOUT, SIGNUP } from '../store/mutation_types'

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
    header: function () {
      if (this.authType === 'login') {
        return 'Log In'
      } else {
        return 'Sign Up'
      }
    },
    changeAuthText: function () {
      if (this.authType === 'login') {
        return 'Not registered? Sign up here >>'
      } else {
        return 'Already have an account? Log in here >>'
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
          response => this.$emit('close'),
          err => console.log(err)
        )
      } else {
        this.signUp().then(
          response => this.$emit('close'),
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
      })
    },
    signUp: function () {
      return this.$store.dispatch(SIGNUP, { user:
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
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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
