import { bodyTypes } from '../misc/types'
import { JSONSchema4Object, JSONSchema4Array, JSONSchema4 } from 'json-schema'

const parseRequestBody = (body: JSONSchema4): bodyTypes => {
  if (body.type === 'array') {
    if (body.items != null) {
      const res: JSONSchema4Array = [parseRequestBody(body.items)]
      return res
    }
  }
  if (body.type === 'object') {
    if (body.properties != null) {
      const res: JSONSchema4Object = {}
      Object.entries(body.properties).forEach(([key, value]) => {
        res[key] = parseRequestBody(value)
      })
      return res
    }
  }
  const res: bodyTypes = body.examples?.[0] ?? null
  return res
}
// type === arr [recursion(body.items)]
// type === obj object.prop.forEach([key,value] => obj[key]: recursion(value))
// body.examples[0]

// const parseRequestBody = async (body: bodyMustHave): Promise<commonObj | commonObj[]> => {
//   const res: bodyTypes = {}
//   const iterator: bodyTypes[] = [body]
//   // dependiendo del tipo en el schema hay que parsear por ejemplo:
//   // type === object tiene properties y type === array tiene items
//   iterator.forEach((field: bodyTypes) => {
//     if (field.type === 'array') {
//       iterator.push(field.items)
//       return undefined
//     }
//     if (field.type === 'object') {
//       iterator.push(...field.properties)
//       return undefined
//     }
//   })
//   const isArray = body.type === 'array'
//   const obj = body.items ?? body
//   const properties = obj.properties
//   if (properties != null) {
//     Object.entries(properties).forEach(([key, value]) => {
//       const val = value?.examples?.[0]
//       res[key] = val ?? ''
//     })
//   }
//   if (isArray) return [res]
//   return res
// }

export default parseRequestBody
