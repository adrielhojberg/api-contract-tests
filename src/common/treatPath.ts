import { pathReplaceVar } from '../misc/utils'
import { IHttpOperation } from '@stoplight/types'
import { PATHVARREGEXP } from '../misc/const'

export const treatPath = async (operation: IHttpOperation<false>): Promise<string> => {
  if (PATHVARREGEXP.test(operation.path)) {
    const example = operation.request?.path?.[0]?.examples?.[0]
    const altExample = operation.request?.path?.[0]?.schema?.examples as Array<string | number | boolean>
    const value = (example != null) && 'value' in example && (typeof example.value === 'string' || typeof example.value === 'number' || typeof example.value === 'boolean') ? example.value.toString() : undefined
    if (value != null) {
      return pathReplaceVar(operation.path, value)
    }
    if (altExample != null) {
      const value: string = altExample?.toString() ?? ''
      return pathReplaceVar(operation.path, value)
    }
  }
  return operation.path
}
