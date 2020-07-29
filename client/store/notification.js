// import axios from 'axios'
import gql from 'graphql-tag'

// import userConfig from '~shared/userconfig'
// import user, { loadUser } from '@/graphql/user.gql'

// import apolloProvider from '@/.nuxt/apollo-module'

// console.log('APP PROV: ', apolloProvider)

export const state = () => ({
  // authenticated: false,
  token: '',
  id: false,
  name: '',
  // userConfig,
  createdAt: null,
  updatedAt: null,
  profile: {},
  groups: [],
  notifications: []
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
  }
}
