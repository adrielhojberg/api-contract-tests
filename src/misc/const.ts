import { LoggerOptions, Logger, pino } from 'pino'
import { IClientConfig } from './types'

// strings

export const SERVER = 'https://petstore3.swagger.io/api/v3'

export const OPERATIONIID = 'Operation'

export const DIRFILE = 'docs/example-api.yaml'

export const HEADERS = { headers: { 'Content-type': 'application/json', accept: '*/*' } }

export const TESTNAME = 'contract'

export const PATHVARREGEXP = /\{.+?\}/

export const PATHVARNAME = /(?<=\{)\w+(?=\})/

export const MISSING_EXAMPLE_MSG = 'Sorry you must provide an example in the file specification for the:'

export const LOGGEROPTIONS: LoggerOptions = {
  transport: {
    targets: [
      { target: 'pino/file', level: 'info', options: { destination: './pino.log', mkdir: true, sync: 'false' } },
      { target: 'pino/file', level: 'error', options: { destination: './pino-error.log', mkdir: true, sync: 'false' } },
      { target: 'pino-pretty', level: 'info', options: { colorize: true } }
    ]
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
