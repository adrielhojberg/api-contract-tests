import { PATHVARREGEXP } from './const'

export const pathReplaceVar = (str: string, toReplace: string): string => {
  return str.replace(PATHVARREGEXP, toReplace)
}
