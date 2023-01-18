import { JSONSchema4 } from 'json-schema'
import parseRequestBody from '../src/common/parseBody'

export default function parseBodyTest (): void {
  it('string', async () => {
    const body: JSONSchema4 = {
      type: 'string',
      examples: ['messi']
    }
    const res = await parseRequestBody(body)
    res?.should.have.string('messi')
  }
  )
  it('array', async () => {
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
    const res = await parseRequestBody(body)
    res?.should.have.eql([['messi']])
  }
  )
  it('deep obj', async () => {
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
    const res = await parseRequestBody(body)
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
