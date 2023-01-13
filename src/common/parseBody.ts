import { bodyTypes } from '../misc/types'
import { JSONSchema4Object, JSONSchema4Array, JSONSchema4 } from 'json-schema'
import { MISSING_EXAMPLE_MSG } from '../misc/const'
import { errorExampleHandler } from '../misc/utils'

const parseRequestBody = async (body: JSONSchema4): Promise<bodyTypes> => {
  if (body.type === 'array') {
    if (body.items != null) {
      const res: JSONSchema4Array = [await parseRequestBody(body.items)]
      return res
    }
  }
  if (body.type === 'object') {
    if (body.properties != null) {
      const res: JSONSchema4Object = {}
      for (const [key, value] of Object.entries(body.properties)) {
        res[key] = await parseRequestBody(value).catch((err: unknown) => {
          return errorExampleHandler(err, `filed: ${key}`)
        })
      }
      return res
    }
  }
  try {
    const res: bodyTypes = body.examples[0]
    return res
  } catch (err) {
    const type = body.type?.toString()
    const message: string = `${MISSING_EXAMPLE_MSG} ${(type != null) ? `type: ${type}` : ''}`
    throw new Error(message)
  }
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
