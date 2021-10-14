import chalk from 'chalk'
import {text} from './data'
import helpers from './demo/helpers'
import Dispatcher from "./demo/event-test"

console.log(chalk.green(text))

const dis = new Dispatcher()

;(async function main() {
  try {
    dis.subscribe('aaa', data => {
      console.log(`on aaa`, data)
    })
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
    dis.dispatch('aaa', {some: `shit`})
  } catch (err) {
    console.log(chalk.bold.red(err))
  }
})()

