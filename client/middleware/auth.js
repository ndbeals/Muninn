export default async function({ app, store, redirect }) {
  if (!app.$apolloHelpers.getToken()) {
    //   error({
    //     message: 'You are not connected',
    //     statusCode: 403
    //   })
    return redirect('/login')
  }
  if (!store.state.user.id) {
    // app.$apollo.
    await store.dispatch('user/loadUser')
  }
  console.log('STO: ', !store.state.user.id, store.state.user.id)

  return true
}
