<template>
  <v-list-item class="px-2">
    <v-list-item-action class="mx-0">
      <!-- <v-icon>mdi-account</v-icon> -->
      <v-avatar color="teal" size="48">
        <span class="white--text headline">{{ name.slice(0, 1).toUpperCase() }}</span>
      </v-avatar>
    </v-list-item-action>
    <v-list-item-content class="pl-3 pt-2 pb-1 mb-auto">
      <v-list-item-subtitle>
        Welcome,
      </v-list-item-subtitle>
      <v-list-item-title v-text="name" />
    </v-list-item-content>
  </v-list-item>
</template>

<style scoped>
.v-list-item__title {
  font-size: 1.15rem;
  /* font-size: 50%; */
}

/* .v-avatar {
  mar
} */

.v-navigation-drawer--mini-variant .v-list-item__action {
  margin-right: 0px !important;
  margin-left: 4px !important;
}
.v-navigation-drawer--mini-variant .v-avatar {
  max-height: 32px !important;
  max-width: 32px !important;
  min-height: 32px !important;
  min-width: 32px !important;
  height: 32px !important;
  width: 32px !important;

  /* margin-right: auto !important;
  margin-left: auto !important; */
}

.v-navigation-drawer--mini-variant .v-avatar > span {
  font-size: 1.1rem !important;
}
/* .v-avatar > span {
  font-size: 50% !important;
  /* font-size: 1.5rem !important;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: normal !important;
  font-family: 'Roboto', sans-serif !important;
} */
</style>

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
    // console.log('getter: ', this.name)
  },
  methods: {}
}
</script>
