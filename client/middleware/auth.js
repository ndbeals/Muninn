export default function({ store, redirect }) {
  console.log('auth middle ware')
  if (!store.state.user.authenticated) {
    //   error({
    //     message: 'You are not connected',
    //     statusCode: 403
    //   })
    return redirect('/login')
  }

  return true
}
