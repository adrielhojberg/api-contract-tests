import { iLogger, iViolations } from '../misc/types'
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { IHttpResponse } from '@stoplight/prism-http/dist'
import { IPrismOutput, IPrismDiagnostic } from '@stoplight/prism-core'

export const generateMessage = (prismDiagnostic: IPrismDiagnostic[]): string[] => {
  return prismDiagnostic.map((violation) => {
    const code = violation.code
    const msg = violation.message
    const path = violation.path
    return `Error${(code != null) ? ` ${code}:` : ':'} ${msg} ${(path?.toString() != null) ? `on ${path.toString()}` : ''}`
  })
}

export const violationsHandler = (violations: IPrismOutput<IHttpResponse>['validations']): iViolations => {
  const violationLogger: iViolations = {
    testData: {}
  }
  const messageInput = generateMessage(violations.input)
  const messageOutput = generateMessage(violations.output)
  violationLogger.testData.request = { message: messageInput }
  violationLogger.testData.response = { message: messageOutput }

  return violationLogger
}

export const loggerTestData = async (response: Awaited<ReturnType<PrismHttp['request']>>): Promise<iLogger | undefined> => {
  const violations = response.violations
  const data = response.data
  const violationLogger = violationsHandler(violations)
  const logger: iLogger = {
    data,
    violations: violationLogger
  }
  return logger
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
