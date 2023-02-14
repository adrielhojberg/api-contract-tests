import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { IHttpOperation } from '@stoplight/types'
import { loggerTestData } from '../common/logger'
import runContractTests from './runner'
import chai from 'chai'
import { generalThrowError } from '../misc/utils'
chai.should()

export default async function individualTest (operation: IHttpOperation<false>, client: PrismHttp): Promise<void> {
  const response = await runContractTests(operation, client)
  try {
    await response.violations.input.should.have.lengthOf(0)
    await response.violations.output.should.have.lengthOf(0)
  } catch (error) {
    const errorLogger = await loggerTestData(response)
    const parsedLogger = typeof errorLogger === 'string' ? errorLogger : JSON.stringify(errorLogger, null, 2)
    return generalThrowError(parsedLogger)
  }
}
