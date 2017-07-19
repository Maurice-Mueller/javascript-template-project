import express from 'express'
import path from 'path'
import open from 'open'

const port = 8088
const app = express()

//any call to root (/)
app.get('/', function(request, result){
  //__dirname holds the directory where the server is run in
  result.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(port, function(error){
  if(error) {
    console.log(error)
  } else {
    open('http://localhost:' + port)
  }
})
