var express = require('express')
var path = require('path')
var open = require('open')

var port = 8088
var app = express()

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
