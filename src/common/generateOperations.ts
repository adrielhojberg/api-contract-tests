import { getHttpOperationsFromSpec } from '@stoplight/prism-cli/dist/operations'
import { PrismHttp, createClientFromOperations } from '@stoplight/prism-http/dist/client'

import { IHttpOperation } from '@stoplight/types'
import { IClientConfig } from '../misc/types'

interface iGetData {
  operations: IHttpOperation[]
  client: PrismHttp
}

export const getData = async (path: string, prismConfig: IClientConfig): Promise<iGetData> => {
  const operations = await getHttpOperationsFromSpec(`${path}`)
  const client = createClientFromOperations(operations, prismConfig)

  return { operations, client }
}
