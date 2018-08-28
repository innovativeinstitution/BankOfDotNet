import applicationUserManager from './applicationusermanager'

const datalayer = {
  serviceUrl: 'http://localhost:59337/api/customers',
  async getCustomers () {
    const token = await applicationUserManager.getToken()
    const response = await fetch(this.serviceUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    })
    let result
    if (response.status !== 201) {
      result = response.statusText
    } else {
      result = await response.json()
    }
    return result
  }
}

export default datalayer
