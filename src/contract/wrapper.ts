import argv from '../common/args'
import { getData } from '../common/generateOperations'
import { CLIENTCONFIG, SERVER, OPERATIONIID } from '../misc/const'
import { IClientConfig } from '../misc/types'
import individualTest from './individualTest'

export default async function wrapper (): Promise<void> {
  // file input
  console.log(argv)
  const fileName = argv.f
  // server input
  const upstream = new URL(SERVER)

  const prismClientConfig: IClientConfig = {
    ...CLIENTCONFIG,
    upstream
  }
  const { operations, client } = await getData(fileName, prismClientConfig)
  describe(`${fileName}`, () => {
    operations.forEach((operation) => {
      it(`${operation.iid ?? OPERATIONIID} @contract`, async () => {
        await individualTest(operation, client)
      })
    })
  })
}
