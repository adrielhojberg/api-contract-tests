
import { IHttpOperation } from '@stoplight/types'
import { treatPath } from '../common/treatPath'
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { bodyMustHave, withBody, withoutBody } from '../misc/types'
import parseRequestBody from '../common/parseBody'

export default async function runContractTests (operation: IHttpOperation<false>, client: PrismHttp): Promise<Awaited<ReturnType<PrismHttp['request']>>> {
  // let res: Awaited<ReturnType<PrismHttp['request']>>
  const server = operation.servers?.[0].variables?.hosts.enum?.[0]
  const baseUrl = `http://${server ?? ''}.static-stg.internal`
  const path = await treatPath(operation)
  const url = `${baseUrl}${path}`

  const body = operation.request?.body
  if (body != null) {
    const schema = body.contents?.[0].schema as bodyMustHave
    const requestBody = await parseRequestBody(schema ?? {})
    const res = await client[operation.method as withBody](url, requestBody)
    return res
  }
  const res = await client[operation.method as withoutBody](url)
  return res
}
