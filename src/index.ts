import './index.css'
import { getUsers } from './api/userApi'
import { deleteUser } from './api/userApi'
import {JL} from 'jsnlog'

JL('index.js').info('info log')
JL('index.js').error('error log')
JL().fatalException('exception log; second parameter is the exception', {})

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

  document.getElementById('users').innerHTML = usersBody

  const deleteLinks = document.getElementsByClassName('deleteUser')

  Array.from(deleteLinks, linkOfArray => {
    let link = <HTMLElement> linkOfArray
    link.onclick = event => {
      const element = <Element> event.target
      console.log(`clicked: ${element.attributes['data-id'].value}`)
      event.preventDefault() //prevent changes to the URL
      deleteUser(element.attributes['data-id'].value)
      const row = element.parentNode.parentNode
      row.parentNode.removeChild(row)
    }
  })
})

export function test() {
  console.log('yeah')
}

export class TestClass {

  constructor() {

  }

  forTest(myNumber: number) {
    return myNumber + 10
  }
}
