import { LOGGER, PATHVARREGEXP } from './const'
import { ProblemJson } from '@stoplight/prism-http'

export const pathReplaceVar = (str: string, toReplace: string, key?: string): string => {
  const pathRegExp = key != null ? new RegExp(`{${key}}`) : PATHVARREGEXP
  return str.replace(pathRegExp, toReplace)
}

export const errorExampleHandler = (err: unknown, message: string): never => {
  const error = err as Error
  const newMessage = `${error.message} ${message}`
  return generalThrowError(newMessage)
}

export const jsonErrorHandler = (err: ProblemJson & Partial<Error>): never => {
  const jsonError = err.type === 'invalid-json'
    ? 'The body type and the header type doesn\'t match, you must send a valid json.\n'
    : ''
  const message = jsonError + (err.message ?? err.detail)
  return generalThrowError(message)
}

export const generalThrowError = (message: string): never => {
  LOGGER.error(message)
  throw new Error(message)
}
