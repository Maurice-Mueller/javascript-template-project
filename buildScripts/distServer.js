import express from 'express'
import path from 'path'
import open from 'open'
import compression from 'compression' //gzip

const port = 8088
const app = express()

app.use(compression()) //enable compression
app.use(express.static('dist'))

//any call to root (/)
app.get('/', function(request, result){
  //__dirname holds the directory where the server is run in
  result.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(port, function(error){
  if(error) {
    console.log(error)
  } else {
    open('http://localhost:' + port)
  }
})

app.get('/test/rest/users', function(request, result){
  result.json([{"id": 1, "name": "Moe Pad", "profession": "developer", "email": "moe@example.com"},
               {"id": 2, "name": "Allan Karlsson", "profession": "blaster", "email": "allan@example.com"},
               {"id": 3, "name": "Moby Dick", "profession": "swimmer", "email": "moby@example.com"},
               {"id": 4, "name": "Andrew Wiggins", "profession": "general", "email": "andrew@example.com"},
             ])
})
