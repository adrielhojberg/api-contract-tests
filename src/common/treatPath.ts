import { pathReplaceVar } from '../misc/Utils'
import { IHttpOperation } from '@stoplight/types'

export const treatPath = async (operation: IHttpOperation<false>): Promise<string> => {
  const example = operation.request?.path?.[0].examples?.[0]
  const value = (example != null) && 'value' in example && typeof example.value === 'string' ? example.value : ''
  const treatedPath = pathReplaceVar(
    operation.path,
    value
  )
  return treatedPath
}
