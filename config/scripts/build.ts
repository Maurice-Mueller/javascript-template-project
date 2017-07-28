import * as webpack from 'webpack'
import webpackConfig from '../webpack/webpack.prod.conf'
import * as chalk from 'chalk'

webpack(webpackConfig).run((error, stats) => {
  if(error) {
    console.log(chalk.red(error.toString()))
    return 1
  }
  console.log('Stats: ' + stats.toString({
    children: false,
    chunkModules: false,
    chunks: false,
    colors: true,
    modules: false
  }))
  console.log(chalk.green('build successful'))
  return 0
})
