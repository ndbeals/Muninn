/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// import axios from 'axios'

export const state = () => ({
  authenticated: false,
  token: '',
  id: ''
})

export const mutations = {
  setToken(state, user) {
    console.log('Set Token Mut')
    // state.authUser = user
  },
  setAuthenticated(state, user) {
    console.log('Set auth Mut')
    // state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    console.log('Nuxt Server Init in store/user.js')
    // if (req.session && req.session.authUser) {
    //   commit('SET_USER', req.session.authUser)
    // }
  }
  // async login({ commit }, { username, password }) {
  //   console.log('Login in store/drawer.js')
  //   commit('SET_USER', {})
  //   try {
  //     // const { data } = await axios.post('/api/login', { username, password })
  //     const data = {}
  //     console.log('login')
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       throw new Error('Bad credentials')
  //     }
  //     throw error
  //   }
  // }
}
