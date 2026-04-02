'use strict'
const { join } = require('path')
const BIN = require.resolve('../bin')
const FIXTURES = join(__dirname, 'fixtures')

function run(fixture) {
  return new Promise((resolve) => {
    let out = null
    let err = null
    const program = global.process ?? global.Bare
    const savedArgv = program.argv.slice()
    const origLog = console.log
    const origErr = console.error

    const restore = () => {
      console.log = origLog
      console.error = origErr
      program.argv.length = 0
      program.argv.push(...savedArgv)
    }

    console.log = (msg) => {
      out = msg
      restore()
      resolve({ out, err })
    }
    console.error = (msg) => {
      err = msg
      restore()
      resolve({ out, err })
    }

    program.argv.length = 0
    program.argv.push(
      global.Bare ? 'bare' : 'node',
      'bin.js',
      '--config',
      join(FIXTURES, fixture, 'pear.json')
    )

    delete require.cache[BIN]
    delete require.cache['file://' + BIN]
    require(BIN)
  })
}
module.exports = { run }
