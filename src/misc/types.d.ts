import { IHttpConfig } from '@stoplight/prism-http'
import * as pino from 'pino'

export type httpMethod = 'request' | 'response'

export type withoutBody = 'get' | 'delete' | 'head' | 'options' | 'trace'
export type withBody = 'post' | 'put' | 'patch'

export declare type IClientConfig = IHttpConfig & {
  baseUrl?: string
  logger?: pino.Logger
}

export default interface iHttpMethod {
  message: string[]
}

export type testData = Partial<Record<httpMethod, iHttpMethod>>

export interface iLogger {
  testData: testData
}
