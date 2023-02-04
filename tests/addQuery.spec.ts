import { IHttpQueryParam, HttpParamStyles } from '@stoplight/types'
import { addQuery } from '../src/common/addQuery'

export default function addQueryTest (): void {
  describe('Path to replace', () => {
    it('path with queries', async () => {
      const path = 'seleccion/jugadores/alias'
      const query: Array<IHttpQueryParam<false>> = [
        {
          name: 'messi',
          schema: {
            examples: ['goat']
          },
          id: 'jugador',
          style: HttpParamStyles.Form
        },
        {
          name: 'aguero',
          schema: {
            examples: ['sinco', 'joshita']
          },
          id: 'jugador',
          style: HttpParamStyles.Form
        },
        {
          name: 'dimaria',
          schema: {
            examples: ['fideo']
          },
          id: 'jugador',
          style: HttpParamStyles.Form
        }
      ]
      const queryParam = await addQuery(query, path)
      queryParam.should.equal('seleccion/jugadores/alias?messi=goat&aguero=sinco&dimaria=fideo')
    })
  })
}
