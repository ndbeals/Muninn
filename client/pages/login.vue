<template>
  <v-container fill-height fluid>
    <v-row> </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="10" md="8" lg="6">
        <v-form @submit="onSubmit">
          <v-card class="elevation-12 mb-1 ">
            <v-toolbar color="primary" dark flat>
              <v-spacer />
              <v-toolbar-title primary-title>Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                />

                <v-text-field
                  id="password"
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
export default {
  // middleware: ['auth'],
  layout: 'guest',
  props: {
    source: String('/login')
  },
  data() {
    return {
      isAuthenticated: false,
      submitting: false,
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
      console.log('submitting', event, this.state)
      event.preventDefault()

      this.$store.state.user.authenticated = true
      this.$router.push('/')

      this.submitting = true
      const { credentials } = this
      try {
        console.log('trying')
        // const res = await this.$apollo
        //   .mutate({
        //     mutation: authenticateUserGql,
        //     variables: credentials
        //   })
        //   .then(({ data }) => data && data.authenticateUser)
        // await this.$apolloHelpers.onLogin(res.token, undefined, { expires: 7 })
        // this.successfulData = res
        // this.isAuthenticated = true
      } catch (e) {
        console.error(e)
        this.error = e
      }
    },
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    }
  }
}
</script>
