import { IHttpQueryParam } from '@stoplight/types'

export function addQuery (query: Array<IHttpQueryParam<false>>, path: string): string {
  let newPath: string = path + '?'
  query.forEach((q, i) => {
    const example = q.schema?.examples as Array<string | number | boolean>
    const newQuery = `${q.name}=${example?.[0]?.toString()}`
    newPath += newQuery
    if (i + 1 !== query.length) {
      newPath += '&'
    }
  })
  return newPath
}
