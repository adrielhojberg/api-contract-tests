import { IHttpConfig } from '@stoplight/prism-http'
import * as pino from 'pino'

export declare type IClientConfig = IHttpConfig & {
  baseUrl?: string
  logger?: pino.Logger
}

export default interface iRequest {
  message: string
}

export interface iTestData {
  request?: iRequest
}

export interface iLogger {
  testData?: iTestData
}
