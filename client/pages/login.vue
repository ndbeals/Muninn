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
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="credentials.email"
                  label="Username"
                  name="Username"
                  prepend-icon="mdi-account"
                  type="text"
                />

                <v-text-field
                  id="password"
                  v-model="credentials.password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary">Login</v-btn>
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
import { startLoadingBar, finishLoadingBar } from '~/js/loading'

export default {
  // middleware: ['auth'],
  layout: 'guest',
  props: {
    source: String('/login')
  },
  data() {
    return {
      error: null,
      credentials: {
        email: '',
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
  },
  mounted() {
    this.isAuthenticated = !!this.$apolloHelpers.getToken()
  },
  methods: {
    async onSubmit(event, b) {
      // console.log('submitting', this.credentials, this.credentials.email)

      // this.$nuxt.$loading.duration = 2000
      // this.$nuxt.$loading.start()
      startLoadingBar(this.$nuxt.$loading, 2000)
      const res = await this.$store.dispatch('user/loginUser', {
        user: this.credentials.email,
        password: this.credentials.password
      })
      finishLoadingBar(this.$nuxt.$loading)
      // this.$nuxt.$loading.finish()

      if (res) {
        this.$router.push('/')
      } else {
        this.error = 'Invalid User or Email'
      }
    },
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    }
  }
}
</script>
