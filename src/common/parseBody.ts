import { JSONSchema7 } from 'json-schema'
import { bodyMustHave } from '../misc/types'

const parseRequestBody = async (body: bodyMustHave): Promise<JSONSchema7> => {
  const res: JSONSchema7 = {}
  const properties = body.properties
  if (properties != null) {
    Object.entries(properties).forEach(([key, value]) => {
      const val = value?.examples?.[0]
      res[key] = val ?? ''
    })
  }
  // Object.entries(body).forEach(([bodyKey, bodyValue]) => {
  //   if (bodyKey === 'properties') {
  //     Object.entries(bodyValue).forEach(([key, value]) => {
  //       const val = value?.examples?.[0]
  //       res[key] = val ?? ''
  //     })
  //   }
  // })
  return res
}

export default parseRequestBody
