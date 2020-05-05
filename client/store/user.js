// import axios from 'axios'
import gql from 'graphql-tag'

import userConfig from '~shared/userconfig'

// import apolloProvider from '@/.nuxt/apollo-module'

// console.log('APP PROV: ', apolloProvider)

export const state = () => ({
  authenticated: false,
  token: '',
  id: '',
  name: '',
  userConfig,
  createdAt: null,
  updatedAt: null,
  profile: {},
  groups: []
})

export const mutations = {
  setToken(state, token) {
    console.log('Set Token Mut')
    state.token = token
    // state.authUser = user
  },
  setAuthenticated(state, authState) {
    state.authenticated = authState
  },
  setID(state, id) {
    state.id = id
  },
  setName(state, name) {
    state.name = name
  },
  setCreatedAt(state, createdAt) {
    state.createdAt = createdAt
  },
  setUpdatedAt(state, updatedAt) {
    state.updatedAt = updatedAt
  },
  setProfile(state, profile) {
    state.profile = profile
  },
  setGroups(state, groups) {
    state.groups = groups
  },

  // setConfigKey(state,{key, val})
  setConfig(state, config) {
    state.config = config
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    // console.log('Nuxt Server Init in store/user.js')
    // if (req.session && req.session.authUser) {
    //   commit('SET_USER', req.session.authUser)
    // }
  },
  async loginUser(ctx, credentials) {
    const client = this.app.apolloProvider.defaultClient
    const { commit } = ctx
    let login
    try {
      ;({
        data: { login }
      } = await $nuxt.$apollo.mutate({
        mutation: gql`
          mutation login($userName: String!, $password: String!) {
            login(userName: $userName, password: $password) {
              id
              token
              name
            }
          }
        `,
        variables: credentials
      }))
    } catch (error) {
      return false
    }
    // console.log('loginuser action', credentials, res)

    if (login.token !== null) {
      commit('setAuthenticated', true)

      commit('setToken', login.token)
      commit('setID', login.id)
      commit('setName', login.Name)

      $nuxt.$apolloHelpers.onLogin(login.token)
      console.log('onLogin: success')
      // await client.mutate({
      //   mutation: gql`
      //     mutation test($id: ID) {
      //       test(id: $id)
      //     }
      //   `,
      //   variables: { id: 215 }
      // })

      return true
    }
    return false
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
