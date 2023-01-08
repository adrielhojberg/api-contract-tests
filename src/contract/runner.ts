
import { IHttpOperation } from '@stoplight/types'
import { treatPath } from '../common/treatPath'
import { IHttpNameValue, IHttpRequest } from '@stoplight/prism-http/dist'
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { bodyMustHave, withBody, withoutBody } from '../misc/types'
import parseRequestBody from '../common/parseBody'

export default async function runContractTests (operation: IHttpOperation<false>, client: PrismHttp): Promise<Awaited<ReturnType<PrismHttp['request']>>> {
  const path = await treatPath(operation)
  const body = operation.request?.body
  if (body != null) {
    const schema = body.contents?.[0].schema as bodyMustHave
    const requestBody = await parseRequestBody(schema ?? {})
    const headers = { headers: { 'Content-type': 'application/json', accept: '*/*' } }
    const res = await client[operation.method as withBody](path, requestBody, headers)
    return res
  }
  const res = await client[operation.method as withoutBody](path)
  return res
}
