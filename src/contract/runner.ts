
import { IHttpOperation } from '@stoplight/types'
import { treatPath } from '../common/treatPath'
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { parseRequestBody } from '../misc/Utils'
import { withBody, withoutBody } from '../misc/types'

export default async function runContractTests (operation: IHttpOperation<false>, client: PrismHttp): Promise<Awaited<ReturnType<PrismHttp['request']>>> {
  let res: Awaited<ReturnType<PrismHttp['request']>>
  let url: string
  const baseUrl = `http://${operation.servers[0].variables.hosts.enum[0]}.static-stg.internal`
  if (operation.path.match(/\{.+?\}/) != null) {
    const path = await treatPath(operation)
    url = baseUrl + path
  } else {
    url = baseUrl + operation.path
  }

  const body = operation.request?.body
  if (body == null) {
    res = await client[operation.method as withoutBody](url)
  } else {
    const requestBody = await parseRequestBody(body.contents?.[0].schema)
    res = await client[operation.method as withBody](url, requestBody)
  }
  return res
}
