import 'whatwg-fetch'
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl()

export function getUsers() {
  return get('test/rest/users')
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError)
}

export function deleteUser(id) {
  return del(`test/rest/users/${id}`)
}

function del(url) {
  const request = new Request(baseUrl + url, {method: 'DELETE'})
  return fetch(request).then(onSuccess, onError)
}

function onSuccess(response) {
  return response.json()
}

function onError(error) {
  console.log(error)
}
