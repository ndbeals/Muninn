/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// import axios from 'axios'

export const state = () => ({
  width: 400
})

export const mutations = {
  SetWidth(state, user) {
    console.log('Set width mutation')
    // state.authUser = user
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
