<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-container class="p-0">
          <v-row
            v-for="(notification, i) in notifications"
            :key="i"
            :test="notifications.length"
            :class="i + 1 == notifications.length ? 'pb-0' : 'pb-4'"
          >
            <v-col cols="12" class="py-0">
              <notification :id="notification.id" :title="notification.title" :body="notification.body" />
              <!-- <notification title="test2 " body="TESTSETSET" /> -->
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="2">
        <!-- <v-container>
          <v-row>
            <v-col cols="2">
              test
            </v-col>
          </v-row>
        </v-container> -->
        <notification-filter />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination v-model="page" :length="6"> </v-pagination>
      </v-col>
    </v-row>
    <!-- <v-row dense>
        <v-col cols="12">
          <notification
            title="test2 "
            body="TESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSETTESTSETSET TESTSETSETTESTSETSETTESTSETSETTESTSETSET TESTSETSET"
          />
        </v-col>
      </v-row> -->
  </v-container>
</template>

<style scoped></style>

<script>
import { mapState } from 'vuex'

import Notification from '@/components/notification/notification.vue'
import NotificationFilter from '@/components/notification/notificationFilter.vue'

import { loadNotifications } from '@/graphql/notification.gql'

export default {
  components: {
    Notification,
    NotificationFilter
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
      notifications: [],
      page: 1
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
