// This file must be first in the test folder
import 'mocha'
import chai from 'chai'
import parseBodyTest from './parseBody.spec'
import addQueryTest from './addQuery.spec'
import utilTest from './utils.spec'

chai.should()

describe('unit',
  () => {
    // first unit log
    it('---- START UNIT TESTS ----', () => {
      console.log('Test running...')
    }
    )
    describe('Body parser types', parseBodyTest)
    describe('Utils tests', utilTest)
    describe('Query params tests', addQueryTest)
  }
)
