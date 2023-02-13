
import { IHttpOperation } from '@stoplight/types'
import { treatPath } from '../common/treatPath'
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { withBody, withoutBody } from '../misc/types'
import parseRequestBody from '../common/parseBody'
import { HEADERS } from '../misc/const'
import { JSONSchema4 } from 'json-schema'
import { errorExampleHandler, jsonErrorHandler } from '../misc/utils'
import { treatUrl } from '../common/treatUrl'
import argv from '../common/args'

export default async function runContractTests (operation: IHttpOperation<false>, client: PrismHttp): Promise<Awaited<ReturnType<PrismHttp['request']>>> {
  const server = argv.s != null ? argv.s : await treatUrl(operation)
  const path = await treatPath(operation)
  const body = operation.request?.body
  const mediaType = body?.contents?.[0].mediaType
  const headers = mediaType != null ? { headers: { 'Content-type': `${mediaType}`, accept: '*/*' } } : HEADERS
  // test with baseurl
  const upstreamOperation = { upstream: new URL(server) }
  // const url = server != null ? `${server}${path}` : path
  if (body != null) {
    const schema = body.contents?.[0].schema as JSONSchema4
    const requestBody = await parseRequestBody(schema ?? {}).catch((err: unknown) => {
      return errorExampleHandler(err, `on path: ${operation.path}`)
    })
    const res = await client[operation.method as withBody](path, requestBody, headers, upstreamOperation).catch(jsonErrorHandler)
    return res
  }
  const res = await client[operation.method as withoutBody](path, upstreamOperation).catch(jsonErrorHandler)
  return res
}
