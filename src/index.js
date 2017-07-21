import './index.css'
import { getUsers } from './api/userApi.js'

debugger
console.log('This is my index.js file.')
console.log('API: ' + getUsers)

getUsers().then(result => {
  let usersBody = ''

  result.forEach(user => {
    usersBody += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.profession}</td>
      </tr>`
  })

  global.document.getElementById('users').innerHTML = usersBody
})
