import path from 'path'
import chalk from "chalk"
import fs from 'fs'
import util from 'util'
import os from 'os'

const fsp = fs.promises
export function runTest() {
  console.log(chalk.bold.red('filename:', path.basename(__filename)))
  console.log(chalk.yellow('dirname:', path.dirname(__filename)))
  console.log(chalk.blue('ext:', path.extname(__filename)))
  console.log(chalk.bold.redBright('parse:', path.parse(__filename).name))
}

const makeDir = util.promisify(fs.mkdir)

export const createDirectory = async p => {
  await makeDir(`${path.dirname(__filename)}/${p}`)
  console.log(chalk.green(`Directory ${path.dirname(__filename)}/${p} is created`))
}

const filePath = path.join(__dirname, 'test', 'text.txt')
const crFile = util.promisify(fs.writeFile)
const apFile = util.promisify(fs.appendFile)

export const writeFile = async file => {
  file = file || filePath
  await crFile(file, 'Hello NodeJS')
  await apFile(file,'\nHello again!')
  console.log(chalk.green(`file ${filePath} is created`))
}

const rdFile = util.promisify(fs.readFile)
// function getData() {
//   return rdFile(filePath)
// }
export const readFile = async content => {
  // await getData().then(data => {
  //   console.log(chalk.yellow(`data: ${data}`))
  // })
  content = await rdFile(filePath)
  console.log(chalk.yellow(`Content: ${content}`))
  await fsp.readFile(filePath).then(data => {
    console.log(chalk.blue(`data: ${data}`))
  })
}

export const osInfo = () => {
  console.log(chalk.bold.yellow(`OS is ${os.platform()}`))
  console.log(chalk.bold.yellow(`cpu is ${os.arch()} `))
  console.log(os.cpus())
  console.log(chalk.green(`free ${os.freemem()} of ${os.totalmem()}`))
  console.log(chalk.green(`home is ${os.homedir()}`))
}

export default {
  runTest,
  createDirectory,
  writeFile,
  readFile,
  osInfo
}
