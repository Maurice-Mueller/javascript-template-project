import commons from '../commons'
import * as express from 'express'
import * as compression from 'compression' //gzip

const port = 8088
const app = express()

app.use(compression({threshold : 512})) //enable compression; adapt threshold (in bytes) to your needs
app.use(express.static('dist'))

//any call to root (/)
app.get('/', (_request: any, result: any) => {
  result.sendFile(commons.resolve('/dist/index.html'))
})

app.listen(port, (error: any) => {
  if(error) {
    console.log(error)
  } else {
    commons.open('http://localhost:' + port)
  }
})
