/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// import axios from 'axios'

export const state = () => ({
  width: 400
})

export const mutations = {
  setWidth(state, width) {
    state.width = width
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    console.log('Nuxt Server Init in store/drawer.js')
    // if (req.session && req.session.authUser) {
    //   commit('SET_USER', req.session.authUser)
    // }
  },
  // setDrawerWidth: {
  //   root: true,
  //   handler: ({ commit }, width) => {
  //     console.log('set drawer width handler')
  //   }
  // },
  setWidth({ commit }, width) {
    commit('setWidth', width)
  },
  async login({ commit }, { username, password }) {
    console.log('Login in store/drawer.js')
    commit('SET_USER', {})
    try {
      // const { data } = await axios.post('/api/login', { username, password })
      const data = {}
      console.log('login')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  }
}
