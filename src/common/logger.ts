import { iLogger } from '../misc/types'

export const violationsHandler = (logger: iLogger, input: boolean) => {
  const data = input ? 'response' : 'request'
  const dataType = input ? 'input' : 'output'
  logger.testData[data] = {}
  logger.testData[data].message = []
  violations[dataType].forEach((violation) => {
    const code = violation.code
    const message = violation.message
    const path = violation.path
    logger.testData[data].message = [
      ...logger.testData[data].message,
        `${code || ''} - ${message} - ${path || ''}`
    ]
  })
}

export const logger_testData = async (response, error) => {
  const logger: iLogger = {}
  const violations = response.violations

  logger.testData = {}
  if (violations.input.length >= 1) {
    violationsHandler(logger, true)
  }
  if (violations.output.length >= 1) {
    violationsHandler(logger, false)
  }

  return logger
}
