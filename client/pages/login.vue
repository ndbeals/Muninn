<template>
  <v-container fill-height fluid>
    <v-row> </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="10" md="8" lg="5">
        <v-form @submit.prevent="onSubmit">
          <v-card class="elevation-12 mb-1 ">
            <v-toolbar color="primary" dark flat>
              <v-spacer />
              <v-toolbar-title primary-title class="display-1">
                Sign in
              </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text error-messages="test">
              <v-text-field
                v-model="credentials.userName"
                :error-messages="loginError.length > 0 ? ' ' : ''"
                autofocus
                label="Username"
                name="Username"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                id="password"
                v-model="credentials.password"
                :error-messages="loginError"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" value="submit" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row> </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/extensions
// import { mapGetters } from 'vuex'
import { startLoadingBar, finishLoadingBar } from '~/js/loading'

export default {
  // middleware: ['auth'],
  layout: 'guest',
  props: {
    source: String('/login')
  },
  data() {
    return {
      loginError: '',
      credentials: {
        userName: '',
        password: ''
      },
      successfulData: null
    }
  },
  computed: {
    envv(a) {
      console.log('a: ', a)
      return {}
    }
    // ...mapGetters('user', ['authenticated'])
  },
  mounted() {
    // this.isAuthenticated = !!this.$apolloHelpers.getToken()
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!this.$apolloHelpers.getToken()) {
      this.$router.push('/')
    }
  },
  methods: {
    async onSubmit(event, b) {
      // this.$nuxt.$loading.duration = 2000
      this.$nuxt.$loading.start()
      // startLoadingBar(this.$nuxt.$loading, 2000)
      const res = await this.$store.dispatch('user/loginUser', {
        userName: this.credentials.userName,
        password: this.credentials.password
      })
      // console.log('submitting', this.credentials, this.credentials.userName, res)
      // finishLoadingBar(this.$nuxt.$loading)

      this.$nuxt.$loading.finish()
      if (res) {
        // console.log('why no reredout? ', !!this.$apolloHelpers.getToken(), this.authenticated)
        this.$router.push('/')
      } else {
        this.loginError = 'Invalid User or Password'
      }
    },
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    }
  }
}
</script>
