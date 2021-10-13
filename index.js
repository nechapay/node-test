import chalk from 'chalk'
import {text} from './data'
import helpers from './demo/helpers'

console.log(chalk.green(text))

;(async function main() {
  try {
    helpers.runTest()
    await helpers.createDirectory('test').then(() => {
      console.log(chalk.green('folder created'))
    }).catch(err => {
      if (err.code === 'EEXIST') {
        console.log(chalk.red('folder created'))
      } else {
        console.log(chalk.bold.red(`Error occurs, Error code -> ${err.code}, Error No -> ${err.errno}`))
      }
    })
    await helpers.writeFile().catch(err => {
      console.log(chalk.bold.red(`Error occurs, Error code -> ${err.code}, Error No -> ${err.errno}`))
    })
    await helpers.readFile().catch(err => {
      console.log(chalk.bold.red(`Error occurs, Error code -> ${err.code}, Error No -> ${err.errno}`))
    })
    helpers.osInfo()
  } catch (err) {
    console.log(chalk.bold.red(err))
  }
})()

