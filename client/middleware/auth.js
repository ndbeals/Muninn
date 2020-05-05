export default function({ app, store, redirect }) {
  if (!app.$apolloHelpers.getToken()) {
    //   error({
    //     message: 'You are not connected',
    //     statusCode: 403
    //   })
    return redirect('/login')
  }

  return true
}
