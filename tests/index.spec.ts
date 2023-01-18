import 'mocha'
import chai from 'chai'
import parseBodyTest from './parseBody.spec'
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
  }
)
