import { errorExampleHandler, pathReplaceVar } from '../misc/utils'
import { IHttpOperation } from '@stoplight/types'
import { MISSING_EXAMPLE_MSG, PATHVARNAME, PATHVARREGEXP } from '../misc/const'
import { addQuery } from './addQuery'

export const treatPath = async (operation: IHttpOperation<false>): Promise<string> => {
  let path = operation.path
  if (PATHVARREGEXP.test(path)) {
    const example = operation.request?.path?.[0]?.examples?.[0]
    const altExample = operation.request?.path?.[0]?.schema?.examples as Array<string | number | boolean>
    if (example != null || altExample != null) {
      const value = (example != null) && 'value' in example && (typeof example.value === 'string' || typeof example.value === 'number' || typeof example.value === 'boolean') ? example.value.toString() : undefined
      if (value != null) {
        path = pathReplaceVar(path, value)
      }
      if (altExample != null) {
        const value: string = altExample?.toString() ?? ''
        path = pathReplaceVar(path, value)
      }
    } else {
      const message = `${MISSING_EXAMPLE_MSG} ${path.match(PATHVARNAME)?.[0] ?? path} on: ${path}`
      throw new Error(message)
    }
  }
  const query = operation.request?.query
  if (query != null && query?.length > 0) {
    path = await addQuery(query, path).catch(err => {
      return errorExampleHandler(err, `on: ${operation.path}`)
    })
  }
  return path
}
