import { UserManager } from 'oidc-client'

class ApplicationUserManager extends UserManager {
  constructor () {
    super({
      authority: 'http://localhost:5000',
      client_id: 'client',
      redirect_uri: 'http://localhost:8080/#/callback/#',
      response_type: 'id_token token',
      scope: 'bankOfDotNetApi',
      post_logout_redirect_uri: 'http://localhost:8080/index.html'
    })
  }

  async login () {
    await this.signinRedirect()
    return this.getUser()
  }

  async logout () {
    return this.signoutRedirect()
  }

  async getToken () {
    var http = new XMLHttpRequest()
    var url = 'http://localhost:5000/connect/token/'
    var params = 'grant_type=client_credentials&scope=bankOfDotNetApi&client_id=client&client_secret=secret'
    http.open('POST', url, true)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        return http.responseText
      }
    }
    http.send(params)
  }
}

const applicationUserManager = new ApplicationUserManager()
export { applicationUserManager as default }
