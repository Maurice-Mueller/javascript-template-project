import './index.css'
import { getUsers } from './api/userApi.js'
import { deleteUser } from './api/userApi.js'

debugger
console.log('This is my index.js file.')
console.log('API: ' + getUsers)

getUsers().then(result => {
  let usersBody = ''

  result.forEach(user => {
    usersBody += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><a href="#" data-id="${user.id}" class="deleteUser">delete</a></td>
      </tr>`
  })

  global.document.getElementById('users').innerHTML = usersBody

  const deleteLinks = global.document.getElementsByClassName('deleteUser')

  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      const element = event.target
      console.log(`clicked: ${element.attributes['data-id'].value}`)
      event.preventDefault() //prevent changes to the URL
      deleteUser(element.attributes['data-id'].value)
      const row = element.parentNode.parentNode
      row.parentNode.removeChild(row)
    }
  })
})
