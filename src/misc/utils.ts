import { PATHVARREGEXP } from './const'

export const pathReplaceVar = (str: string, toReplace: string): string => {
  return str.replace(PATHVARREGEXP, toReplace)
}

export const errorExampleHandler = (err: unknown, message: string): never => {
  const error = err as Error
  const newMessage = `${error.message} ${message}`
  throw new Error(newMessage)
}
