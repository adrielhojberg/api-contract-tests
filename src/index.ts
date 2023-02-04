#!/usr/bin/env node
import argv from './common/args'
import path from 'path'
import Mocha from 'mocha'
if (argv.f !== '') {
  console.log(argv)
}

const mocha = new Mocha()

const testSource = path.join(__dirname, 'contract/index.spec')
mocha.addFile(testSource)
mocha.run()
