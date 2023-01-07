import { bodyMustHave, commonObj } from '../misc/types'

const parseRequestBody = async (body: bodyMustHave): Promise<commonObj> => {
  const res: commonObj = {}
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
