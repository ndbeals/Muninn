/* eslint-disable no-param-reassign */

// eslint-disable-next-line no-underscore-dangle
let _duration = 5000
export function startLoadingBar(loadingBar, duration) {
  // loadingBar.preDuration = loadingBar.duration
  console.log('set dur star: ', loadingBar.duration, _duration)
  _duration = loadingBar.duration
  loadingBar.duration = duration
  console.log('set dur star: ', loadingBar.duration, _duration)
  loadingBar.start()
}

export function finishLoadingBar(loadingBar) {
  loadingBar.finish()
  // loadingBar.duration = loadingBar.preDuration
  console.log('set dur fin: ', loadingBar.duration, _duration)
  loadingBar.duration = _duration
  console.log('set dur fin: ', loadingBar.duration, _duration)
}
