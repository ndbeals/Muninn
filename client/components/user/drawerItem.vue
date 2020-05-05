<template>
  <v-list-item class="px-2">
    <v-list-item-action class="mr-2">
      <!-- <v-icon>mdi-account</v-icon> -->
      <v-avatar color="teal" size="48">
        <span class="white--text headline">{{ name.slice(0, 1).toUpperCase() }}</span>
      </v-avatar>
    </v-list-item-action>
    <v-list-item-content class="pt-2 pb-1 mb-auto">
      <v-list-item-subtitle>
        Welcome,
      </v-list-item-subtitle>
      <v-list-item-title v-text="name" />
    </v-list-item-content>
  </v-list-item>
</template>

<style></style>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['name'])
  },
  mounted() {
    console.log('getter: ', this.name)
  },
  methods: {}
}
</script>
