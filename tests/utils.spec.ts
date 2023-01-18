import { pathReplaceVar } from '../src/misc/utils'

export default function utilTest (): void {
  describe('Path to replace', () => {
    it('{variable}', () => {
      const path = 'jugador/{variable}'
      const replaceVal = 'messi'
      pathReplaceVar(path, replaceVal).should.equal('jugador/messi')
    })
    it('not variable', () => {
      const path = 'jugador'
      const replaceVal = 'messi'
      pathReplaceVar(path, replaceVal).should.equal('jugador')
    })
  })
}
