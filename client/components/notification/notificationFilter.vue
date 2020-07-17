<template>
  <v-card class="mx-auto">
    test
  </v-card>
</template>

<style scoped></style>

<script>
import { mapState } from 'vuex'

// import Notification from '@/components/notification.vue'

import { loadNotifications } from '@/graphql/notification.gql'

export default {
  components: {
    // Notification
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    query: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    elevation: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      notifications: []
    }
  },
  computed: {
    ...mapState('user', ['name'])
  },
  async mounted() {
    const { data } = await $nuxt.$apollo.query({ query: loadNotifications })
    console.log('got all: ', data)
    this.notifications = data.Notifications
  },
  methods: {}
}
</script>
