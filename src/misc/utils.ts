export const pathReplaceVar = (str: string, toReplace: string): string => {
  return str.replace(/\{.+?\}/, toReplace)
}
