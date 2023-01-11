import { JSONSchema4 } from 'json-schema'
import 'mocha'
import parseRequestBody from '../src/common/parseBody'
import chai from 'chai'
chai.should()

describe('unit',
  () => {
    // body parser
    describe('Body parser types',
      () => {
        it('string', () => {
          const body: JSONSchema4 = {
            type: 'string',
            examples: ['messi']
          }
          const res = parseRequestBody(body)
          res?.should.have.string('messi')
        }
        )
        it('array', () => {
          const body: JSONSchema4 = {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'string',
                examples: ['messi']
              }
            }
          }
          const res = parseRequestBody(body)
          res?.should.have.eql([['messi']])
        }
        )
        it('deep obj', () => {
          const body: JSONSchema4 = {
            type: 'object',
            properties: {
              arquero: {
                type: 'string',
                examples: ['dibu']
              },
              jugadores: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    eldiez: {
                      type: 'string',
                      examples: ['messi']
                    },
                    motorcito: {
                      type: 'string',
                      examples: ['depol']
                    },
                    fideo: {
                      type: 'string',
                      examples: ['dimaria']
                    }
                  }
                }
              }
            }
          }
          const res = parseRequestBody(body)
          res?.should.have.eql({
            arquero: 'dibu',
            jugadores: [{
              eldiez: 'messi',
              motorcito: 'depol',
              fideo: 'dimaria'
            }]
          })
        }
        )
      }
    )
  }
)
