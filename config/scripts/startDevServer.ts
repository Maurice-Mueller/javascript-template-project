import * as express from 'express'
import * as webpack from 'webpack'
import config from '../webpack/webpack.dev.conf'
import * as webpackMiddleware from 'webpack-middleware'
import commons from '../commons'

const port = 8088
const app = express()
const compiler = webpack(config)

app.use((webpackMiddleware)(compiler, {noInfo: true, publicPath: '/'}))

//any call to root (/)
app.get('/', (_request: any, result: any) => {
  result.sendFile(commons.resolve('src/main/index.html'))
})

app.listen(port, (error: any) => {
  if(error) {
    console.log(error)
  } else {
    commons.open('http://localhost:' + port)
  }
})
