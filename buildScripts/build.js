/*eslint-disable no-console*/
/*eslint-disable no-unused-vars*/
import webpack from 'webpack'
import webpackConfig from '../webpack/webpack.config.prod'
import chalk from 'chalk'

process.env.NODE_ENV = 'production'

webpack(webpackConfig).run((error, stats) => {
  if(error) {
    console.log(chalk.red(error))
    return 1
  }
  console.log(chalk.green('build successful'))
  return 0
})
