import { LoggerOptions, Logger, pino } from 'pino'
import { IClientConfig } from './types'

// strings

export const SERVER = 'https://petstore3.swagger.io/api/v3'

export const OPERATIONIID = 'Operation'

export const DIRFILE = 'docs/example-api.yaml'

export const HEADERS = { headers: { 'Content-type': 'application/json', accept: '*/*', Authorization: '' } }

export const TESTNAME = 'contract'

export const PATHVARREGEXP = /\{.+?\}/

export const PATHVARNAME = /(?<=\{)\w+(?=\})/

export const MISSING_EXAMPLE_MSG = 'Sorry you must provide an example in the file specification for the:'

export const LOGGEROPTIONS: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
}

export const LOGGER: Logger<LoggerOptions> = pino(LOGGEROPTIONS)

export const CLIENTCONFIG: IClientConfig = {
  mock: false,
  validateRequest: true,
  validateResponse: true,
  checkSecurity: false,
  errors: false,
  upstreamProxy: undefined,
  upstream: new URL(SERVER),
  logger: LOGGER
}
