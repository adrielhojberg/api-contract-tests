import { IHttpQueryParam } from '@stoplight/types'
import { MISSING_EXAMPLE_MSG } from '../misc/const'

export async function addQuery (query: Array<IHttpQueryParam<false>>, path: string): Promise<string> {
  let newPath: string = path + '?'
  query.forEach((q, i) => {
    const examples = q.schema?.examples as Array<string | number | boolean | undefined>
    const example = examples?.[0]
    if (example != null) {
      const newQuery = `${q.name}=${example.toString()}`
      newPath += newQuery
    } else {
      const message = `${MISSING_EXAMPLE_MSG} query: ${q.name}`
      throw new Error(message)
    }
    if (i + 1 !== query.length) {
      newPath += '&'
    }
  })
  return newPath
}
