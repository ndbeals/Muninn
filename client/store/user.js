// import axios from 'axios'
import gql from 'graphql-tag'

import userConfig from '~shared/userconfig'
import user, { loadUser } from '@/graphql/user.gql'

// import apolloProvider from '@/.nuxt/apollo-module'

// console.log('APP PROV: ', apolloProvider)

export const state = () => ({
  // authenticated: false,
  token: '',
  id: false,
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
  // setAuthenticated(state, authState) {
  //   state.authenticated = authState
  // },
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

export const getters = {
  // authenticated(state) {
  //   console.log('auth getter')
  //   const hasToken = !!$nuxt.$apolloHelpers.getToken()
  //   return hasToken
  // }
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
    console.log('login user')
    const { commit, dispatch } = ctx
    let login
    try {
      ;({
        data: { login }
      } = await $nuxt.$apollo.mutate({
        mutation: user.login,
        variables: credentials
      }))
    } catch (error) {
      // return false
      console.error(error)
      return false
    }
    // console.log('loginuser action', credentials, res)

    if (login !== null) {
      if (login.token !== null) {
        // commit('setAuthenticated', true)
        await $nuxt.$apolloHelpers.onLogin(login.token)

        // commit('setToken', login.token)
        // commit('setID', login.id)
        // commit('setName', login.Name)
        await dispatch('loadUser')

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
    }
    return false
  },
  async loadUser({ commit }) {
    if (this.app.$apolloHelpers.getToken()) {
      console.log('loading user')

      try {
        const { data } = await this.app.apolloProvider.defaultClient.query({
          query: loadUser
        })

        if (data) {
          const { id, name, createdAt, updatedAt } = data.User
          commit('setID', id)
          commit('setName', name)
          // commit('setCreatedAt', createdAt)
          // commit('setUpdatedAt', updatedAt)
        }
      } catch (error) {
        console.error('Caught err: ', error)
      }
    }
  }
}
