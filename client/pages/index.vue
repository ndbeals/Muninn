<template>
  <!-- <v-layout column justify-center align-center> -->
  <!-- <v-flex xs12 sm8 md6> -->
  <!-- <div class="text-center">
        <logo />
        <vuetify-logo />
      </div> -->

  <notification-view> </notification-view>
  <!-- <h1>fart</h1> -->

  <!-- <v-card>
        <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template</v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower
            developers to create amazing applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a href="https://vuetifyjs.com" target="_blank">documentation</a>.
          </p>
          <p>
            If you have questions, please join the official
            <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>.
          </p>
          <p>
            Find a bug? Report it on the github
            <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em>
              <small>&mdash; John Leider</small>
            </em>
          </div>
          <hr class="my-3" />
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <br />
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>
          <v-btn color="primary" @click="loading">Timer</v-btn>
        </v-card-actions>
      </v-card> -->
  <!-- </v-flex> -->
  <!-- </v-layout> -->
</template>

<script>
import gql from 'graphql-tag'
// import { loadUser } from '@/graphql/user.gql'
import { loadNotifications } from '@/graphql/notification.gql'

import { startLoadingBar, finishLoadingBar } from '~/js/loading'

import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

import NotificationView from '@/components/notification/notificationView.vue'
// import Notification from '@/components/notification.vue'

export default {
  components: {
    // Logo,
    // VuetifyLogo,
    NotificationView
    // Notification
  },
  data() {
    return { notifications: [] }
  },
  async mounted() {
    const { data } = await $nuxt.$apollo.query({ query: loadNotifications })
    console.log('got all: ', data)
    this.notifications = data.Notifications
  },
  methods: {
    async loading() {
      console.log('loading!!!!!!!!')
      // this.$nextTick(() => {
      // this.$nuxt.$loading.start()
      // startLoadingBar(this.$nuxt.$loading, 5000)
      // const data = await $nuxt.$apollo.mutate({
      //   mutation: loadUser
      //   // variables: { id: 1 }
      // })
      // console.log('loaded: ', data)

      // setTimeout(() => {
      //   // this.$nuxt.$loading.finish()
      //   finishLoadingBar(this.$nuxt.$loading)
      //   console.log('finihs')
      // }, 5000)
      // })
    }
  }
  // middleware: ['auth'],
}
</script>
