import { pathReplaceVar } from '../misc/utils'
import { IHttpOperation } from '@stoplight/types'
import { PATHVARREGEXP } from '../misc/const'

export const treatPath = async (operation: IHttpOperation<false>): Promise<string> => {
  if (PATHVARREGEXP.test(operation.path)) {
    const example = operation.request?.path?.[0]?.examples?.[0]
    const value = (example != null) && 'value' in example && (typeof example.value === 'string' || typeof example.value === 'number') ? example.value.toString() : undefined
    if (value != null) {
      return pathReplaceVar(operation.path, value)
    }
  }
  return operation.path
}
