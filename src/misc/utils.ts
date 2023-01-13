import { PATHVARREGEXP } from './const'
import { ProblemJson } from '@stoplight/prism-http'

export const pathReplaceVar = (str: string, toReplace: string): string => {
  return str.replace(PATHVARREGEXP, toReplace)
}

export const jsonErrorHandler = (err: ProblemJson & Partial<Error>): never => {
  const jsonError = err.type === 'invalid-json'
    ? 'The body type and the header type doesn\'t match, you must send a valid json.\n'
    : ''
  const message = jsonError + (err.message ?? err.detail)
  throw new Error(message)
}
