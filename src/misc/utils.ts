import { JSONSchema7 } from 'json-schema'

export const parseRequestBody = async (body: JSONSchema7): Promise<JSONSchema7> => {
  const res: JSONSchema7 = {}
  Object.entries(body).forEach(([bodyKey, bodyValue]) => {
    if (bodyKey === 'properties') {
      Object.entries(bodyValue).forEach(([key, value]) => {
        const val = value?.examples?.[0]
        res[key] = val ?? ''
      })
    }
  })
  return res
}

export const pathReplaceVar = (str: string, toReplace: string): string => {
  return str.replace(/\{.+?\}/, toReplace)
}
