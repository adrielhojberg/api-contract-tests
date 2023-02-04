import { pathReplaceVar } from '../misc/utils'
import { IHttpOperation } from '@stoplight/types'
import { MISSING_EXAMPLE_MSG, PATHVARNAME, PATHVARREGEXP } from '../misc/const'

export const treatUrl = async (operation: IHttpOperation<false>): Promise<string> => {
  let server = operation?.servers?.[0]?.url
  if (server !== undefined) {
    if (PATHVARREGEXP.test(server)) {
      const variables = operation.servers?.[0].variables
      if (variables != null) {
        for (const [key, value] of Object.entries(variables)) {
          server = pathReplaceVar(server, value.default, key)
        }
      } else {
        const message = `${MISSING_EXAMPLE_MSG} ${server.match(PATHVARNAME)?.[0] ?? server} on: ${server}`
        throw new Error(message)
      }
      return server
    } else {
      return server
    }
  } else {
    throw new Error('Server is not defined')
  }
}
