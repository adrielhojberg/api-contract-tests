import { bodyMustHave, commonObj } from '../misc/types'

const parseRequestBody = async (body: bodyMustHave): Promise<commonObj | commonObj[]> => {
  const res: commonObj = {}
  // dependiendo del tipo en el schema hay que parsear por ejemplo:
  // type === object tiene properties y type === array tiene items
  const isArray = body.type === 'array'
  const obj = body.items ?? body
  const properties = obj.properties
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
  if (isArray) return [res]
  return res
}

export default parseRequestBody
