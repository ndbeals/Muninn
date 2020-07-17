<template>
  <v-navigation-drawer
    ref="drawer"
    v-model="drawer"
    :mini-variant="miniVariant"
    :width="mainDrawer.width"
    :permanent="drawer"
    :clipped="mainDrawer.clipped"
    absolute
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
</template>

<script>
// import { mapMutations } from 'vuex'
// import { mapState } from 'vuex'

// console.log(mapState('user', ['userConfig.mainDrawer.width']))
export default {
  middleware: ['auth'],
  data() {
    return {
      navigation: {
        borderSize: 4
      },
      clipped: true,
      drawer: true,
      fixed: false,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      mainDrawer: {
        clipped: true,
        resizing: false,
        width: 200,
        borderSize: 4
      }
    }
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
      // MIN_DRAWER_WIDTH & MAX_DRAWER_WIDTH
      const width = Math.min(Math.max(w, this.mainDrawer.borderSize + 170), document.body.scrollWidth * 0.4)

      this.mainDrawer.width = width
    },
    setEvents() {
      const minSize = this.navigation.borderSize
      const el = this.$refs.drawer.$el
      const container = this.$refs.container.$el
      const appBar = this.$refs.appBar.$el
      const drawerBorder = el.querySelector('.v-navigation-drawer__border')
      const direction = el.classList.contains('v-navigation-drawer--right') ? 'right' : 'left'

      const resize = (e, b) => {
        document.body.style.cursor = 'ew-resize'
        const offset = direction === 'right' ? document.body.scrollWidth - e.clientX : e.clientX
        this.setMainDrawerWidth(offset)
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
