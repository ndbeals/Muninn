<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" min-width="260" :elevation="hover ? 12 : 2">
      <!-- <v-card-title>
        {{ title }}
        <v-spacer />
        <v-btn-toggle v-model="toggle_exclusive" class="mt-n3 mr-n3" borderless background-color="transparent">
          <v-btn text>
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>
          <v-btn text>
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn> -->
      <!-- </v-btn-toggle> -->
      <!-- </v-card-title> -->
      <v-app-bar color="primary" dense dark flat>
        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-card-text v-html="body">
        <!-- {{ body }} -->
        <!-- <div>Word of the Day</div>
        <p class="display-1 text--primary">
          be•nev•o•lent
        </p>
        <p>adjective</p>
        <div class="text--primary">
          well meaning and kindly.<br />
          "a benevolent smile"
        </div> -->
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn text color="deep-purple accent-4">
          Learn More
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-hover>
</template>

<style scoped>
/* .something {
    color: var(--v-primary-base);
    background-color: var(--v-accent-lighten2);
  } */
</style>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
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
    return {}
  },
  computed: {
    ...mapState('user', ['name'])
  },
  mounted() {
    console.log('getter: ', this.title)
    // this.title += this.title
  },
  methods: {}
}
</script>
