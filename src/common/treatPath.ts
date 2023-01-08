import { pathReplaceVar } from '../misc/utils'
import { IHttpOperation } from '@stoplight/types'

export const treatPath = async (operation: IHttpOperation<false>): Promise<string> => {
  // como se machea la info
  // console.log(operation)
  // console.log(operation.request?.body?.contents?.[0].schema?.properties)
  // console.log(operation.responses.map(res => res.contents?.map(cont => cont.schema?.properties?.username)))

  const example = operation.request?.path?.[0]?.examples?.[0]
  const value = (example != null) && 'value' in example && typeof example.value === 'string' ? example.value : undefined
  if (value != null) {
    return pathReplaceVar(operation.path, value)
  }
  return operation.path
}
