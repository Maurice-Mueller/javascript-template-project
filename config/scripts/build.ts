import * as webpack from 'webpack'
import webpackConfig from '../webpack/webpack.prod.conf'
import * as chalk from 'chalk'

webpack(webpackConfig).run((error, stats) => {
  if(error) {
    console.log(chalk.red(error))
    return 1
  }
  console.log('Stats: ' + stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))
  console.log(chalk.green('build successful'))
  return 0
})
