<template>
  <v-app dark>
    <v-navigation-drawer
      ref="drawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :width="mainDrawer.width"
      :fixed="fixed"
      :value="true"
      app
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar ref="appBar" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content ref="container">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import { mapMutations } from 'vuex'
import { mapState } from 'vuex'

console.log(mapState('user', ['userConfig.mainDrawer.width']))
export default {
  middleware: ['auth'],
  data() {
    return {
      navigation: {
        borderSize: 4
      },
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      mainDrawer: {
        resizing: false,
        width: 200,
        borderSize: 4
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    // mainDrawer: {
    //   width: {
    //     get: () => this.$store.state.drawer.width
    //     // set: (val) =>
    //   }
    // },
    // ...mapState('drawer', ['width'])
    // ...mapState('user', { width: (state) => state.userConfig.mainDrawer.width })
  },
  mounted() {
    this.setBorderWidth()
    this.setEvents()
  },
  methods: {
    setBorderWidth() {
      const i = this.$refs.drawer.$el.querySelector('.v-navigation-drawer__border')
      i.style.width = `${this.navigation.borderSize}px`
      i.style.cursor = 'ew-resize'
    },
    setMainDrawerWidth(w) {
      // this.mainDrawer.width =
      // MIN_DRAWER_WIDTH & MAX_DRAWER_WIDTH
      const width = Math.min(Math.max(w, this.mainDrawer.borderSize), document.body.scrollWidth * 0.4)

      // this.$refs.dra
      this.mainDrawer.width = width
    },
    setEvents() {
      const minSize = this.navigation.borderSize
      const el = this.$refs.drawer.$el
      const container = this.$refs.container.$el
      const appBar = this.$refs.appBar.$el
      const drawerBorder = el.querySelector('.v-navigation-drawer__border')
      // const vm = this
      const direction = el.classList.contains('v-navigation-drawer--right') ? 'right' : 'left'

      const resize = (e, b) => {
        document.body.style.cursor = 'ew-resize'
        const f = direction === 'right' ? document.body.scrollWidth - e.clientX : e.clientX
        // el.style.width = `${Math.max(f, 4)}px`
        // this.mainDrawer.width = el.style.width
        this.setMainDrawerWidth(f)
      }

      drawerBorder.addEventListener(
        'mousedown',
        (e) => {
          if (e.offsetX < minSize) {
            // mousePos = e.x
            el.style.transition = 'initial'
            container.style.transition = 'initial'
            appBar.style.transition = 'initial'

            document.addEventListener('mousemove', resize, false)
            document.addEventListener(
              'mouseup',
              async () => {
                el.style.transition = ''
                container.style.transition = ''
                appBar.style.transition = ''
                document.body.style.cursor = ''

                this.$store.dispatch('drawer/setWidth', el.style.width)
                document.removeEventListener('mousemove', resize, false)
              },
              { capture: false, once: true }
            )
          }
        },
        false
      )
    }
  }
}
</script>
