import jsf from 'json-schema-faker'
import schema from './mockDataSchema'
import fs from 'fs'
import chalk from 'chalk'

jsf.extend('faker', function() {
  return require('faker')
})

const json = JSON.stringify(jsf(schema))

fs.writeFile('./src/api/mockSchema.json', json, error => {
  if(error) {
    return console.log(chalk.red(error))
  }
  console.log(chalk.green("Mock data successfully generated."))
})
