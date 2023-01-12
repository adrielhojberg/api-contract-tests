import { pathReplaceVar } from '../misc/utils'
import { IHttpOperation } from '@stoplight/types'
import { PATHVARREGEXP } from '../misc/const'
import { addQuery } from './addQuery'

export const treatPath = async (operation: IHttpOperation<false>): Promise<string> => {
  let path = operation.path
  if (PATHVARREGEXP.test(path)) {
    const example = operation.request?.path?.[0]?.examples?.[0]
    const altExample = operation.request?.path?.[0]?.schema?.examples as Array<string | number | boolean>
    const value = (example != null) && 'value' in example && (typeof example.value === 'string' || typeof example.value === 'number' || typeof example.value === 'boolean') ? example.value.toString() : undefined
    if (value != null) {
      path = pathReplaceVar(path, value)
    }
    if (altExample != null) {
      const value: string = altExample?.toString() ?? ''
      path = pathReplaceVar(path, value)
    }
  }
  const query = operation.request?.query
  if (query != null && query?.length > 0) {
    path = addQuery(query, path)
  }
  return path
}
