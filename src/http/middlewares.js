import localStorage from 'localStorage'
module.exports = function (router) {
  router.beforeEach(function (transition) {
    let token = localStorage.getItem('token')
    let redirect = encodeURIComponent(transition.to.path)
    if (transition.to.auth) {
      if (!token || token == null || token === 'null') {
        return transition.redirect('/login?redirect=' + redirect)
      }
    }

    transition.next()
  })
}
