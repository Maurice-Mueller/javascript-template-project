export default function getBaseUrl() {
  const inDevelopment = window.location.hostname === 'localhost' //running on localhost?
  return inDevelopment? 'http://localhost:8090/' : '/'
}
