
import { IHttpOperation } from '@stoplight/types'
import { treatPath } from '../common/treatPath'
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { bodyMustHave, withBody, withoutBody } from '../misc/types'
import parseRequestBody from '../common/parseBody'

export default async function runContractTests (operation: IHttpOperation<false>, client: PrismHttp): Promise<Awaited<ReturnType<PrismHttp['request']>>> {
  const server = operation.servers?.[0].url
  const path = await treatPath(operation)
  const body = operation.request?.body
  const upstreamOperation = { upstream: new URL(server ?? '') }
  // const url = server != null ? `${server}${path}` : path
  if (body != null) {
    const schema = body.contents?.[0].schema as bodyMustHave
    const requestBody = await parseRequestBody(schema ?? {})
    const headers = { headers: { 'Content-type': 'application/json', accept: '*/*' } }
    const res = await client[operation.method as withBody](path, requestBody, headers, upstreamOperation)
    return res
  }
  const res = await client[operation.method as withoutBody](path, upstreamOperation)
  return res
}
