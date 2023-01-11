import { IHttpConfig } from '@stoplight/prism-http'
import { JSONSchema7, JSONSchema4Type } from 'json-schema'
import * as pino from 'pino'

export type httpMethod = 'request' | 'response'

export type withoutBody = 'get' | 'delete' | 'head' | 'options' | 'trace'
export type withBody = 'post' | 'put' | 'patch'

interface NestedArray<T> extends Array<T | NestedArray<T>> {
}

export type bodyTypes = JSONSchema4Type | NestedArray<bodyTypes>

export declare type IClientConfig = IHttpConfig & {
  baseUrl?: string
  logger?: pino.Logger
  upstream?: URL
}

export default interface iHttpMethod {
  message: string[]
}

export type testData = Partial<Record<httpMethod, iHttpMethod>>

export interface iViolations {
  testData: testData
}

export interface iLogger {
  violations?: iViolations
  data?: unknown
}

export interface iValue {
  examples?: bodyTypes[]
}

export interface iProperties {
  [key: string]: iValue
}

export interface bodyMustHave extends JSONSchema7 {
  properties?: iProperties
  items?: iValue
}

export interface commonObj {
  [key: string]: unknown
}
