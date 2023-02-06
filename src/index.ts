#!/usr/bin/env node
import path from 'path'
import Mocha from 'mocha'

const mocha = new Mocha()

const testSource = path.join(__dirname, 'contract/index.spec')
mocha.addFile(testSource)
mocha.run()
