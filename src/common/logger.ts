import { iLogger } from '../misc/types'
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { IHttpResponse } from '@stoplight/prism-http/dist'
import { IPrismOutput } from '@stoplight/prism-core'

export const violationsHandler = (input: boolean, violations: IPrismOutput<IHttpResponse>['validations']): iLogger => {
  const data = input ? 'response' : 'request'
  const dataType = input ? 'input' : 'output'
  const logger: iLogger = {
    testData: {}
  }
  const message = violations[dataType].map((violation) => {
    const code = violation.code
    const msg = violation.message
    const path = violation.path
    return `${code ?? ''} - ${msg} - ${path?.toString() ?? ''}`
  })
  logger.testData[data] = { message }
  // return logger
  return {
    testData: {
      [data]: message
    }
  }
  // old code
  // violations[dataType].forEach((violation) => {
  //   const code = violation.code
  //   const message = violation.message
  //   const path = violation.path
  //   mnjs = [
  //     ...logger.testData[data].message,
  //       `${code || ''} - ${message} - ${path ?? ''}`
  //   ]
  // })
}

export const loggerTestData = async (response: Awaited<ReturnType<PrismHttp['request']>>): Promise<iLogger | undefined> => {
  const violations = response.violations

  if (violations.input.length >= 1) {
    return violationsHandler(true, violations)
  }
  if (violations.output.length >= 1) {
    return violationsHandler(false, violations)
  }
  return undefined
}

// export const createErrorLogsFile = async (logs) => {
//   const [serviceTitle, servicesTests] = Object.entries(logs)[0]
//   const prettyTests = servicesTests.reduce((str, test) => {
//     // const treatedMessageResponse = test.messageResponse.split("-");
//     const testStr = `Error ---${test.testTitle}---
//     ${test.messageResponse || ''}
//     ${test.messageRequest || ''}
//     `
//     return `${str} ${testStr}`
//   }, '')
//   await fs.writeFileSync(
//     `output/${serviceTitle}.txt`,
//     prettyTests,
//     function (err) {}
//   )
// }
