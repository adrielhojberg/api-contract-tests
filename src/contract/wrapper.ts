import { getData } from '../common/generateOperations'
import { prismClientConfig } from '../misc/const'
import individualTest from './individualTest'

export default async function wrapper (fileName: string): Promise<void> {
  const { operations, client } = await getData('docs/example-api.yaml', prismClientConfig)
  describe(`${fileName}`, () => {
    // describe function
    operations.forEach((operation) => {
      it(`${operation.iid ?? 'operation'} @contract`, async () => {
        await individualTest(operation, client)
      })
    })
  })
}
