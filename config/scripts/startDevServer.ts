import * as express from 'express'
import * as open from 'open'
import * as webpack from 'webpack'
import config from '../webpack/webpack.dev.conf'
import * as webpackMiddleware from 'webpack-middleware'
import commons from '../commons'

const port = 8088
const app = express()
const compiler = webpack(config)

app.use((webpackMiddleware)(compiler, {noInfo: true, publicPath: '/'}))

//any call to root (/)
app.get('/', function(_request, result){
  result.sendFile(commons.resolve('src/index.html'))
})

app.listen(port, function(error){
  if(error) {
    console.log(error)
  } else {
    open('http://localhost:' + port)
  }
})
