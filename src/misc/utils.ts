import fs from 'fs'
import { getHttpOperationsFromSpec } from "@stoplight/prism-cli/dist/operations"
import { createClientFromOperations, PrismHttp } from "@stoplight/prism-http/dist/client"
import { IHttpOperation } from '@stoplight/types'

export const getData = async (path:string) => {
  const operations = await getHttpOperationsFromSpec(`${path}`);
  const client = createClientFromOperations(operations, {
    mock: false,
    validateRequest: true,
    validateResponse: true,
    checkSecurity: false,
    errors: false,
    upstream: new URL(
      `http://${operations[0].servers[0].variables.hosts.enum[0]}.static-stg.internal`
    ),
    upstreamProxy: undefined,
  });

  return { operations, client };
}

export const runContractTests = async (operation:IHttpOperation<false>[], client:PrismHttp) => {
  let res;
  let url;
  let baseUrl = `http://${operation.servers[0].variables.hosts.enum[0]}.static-stg.internal`;
  if (operation.path.match(/\{.+?\}/)) {
    let path = await treatPath(operation);
    url = baseUrl + path;
  } else {
    url = baseUrl + operation.path;
  }

  const body = operation.request?.body;
  if (!body) {
    res = await client[operation.method](url);
  } else {
    const requestBody = await parseRequestBody(body.contents[0].schema);
    res = await client[operation.method](url, requestBody);
  }
  return res;
}

export const parseRequestBody =  async (body) => {
  let res = {};
  Object.entries(body).map(([key, value]) => {
    if (key === "properties") {
      Object.entries(value).forEach(([key, value]) => {
        res[key] = value.examples?.[0] || "";
      });
    }
  });
  return res;
}

export const treatPath =  async (operation) => {
  let treatedPath = pathReplaceVar(
    operation.path,
    operation.request.path[0].examples[0].value
  );
  return treatedPath;
}

export const pathReplaceVar =  async (str, toReplace) => {
  return str.replace(/\{.+?\}/, toReplace);
}

export const logger_testData =  async (response, error) => {
  const logger = {};
  let violations = response.violations;

  logger["Test_Data"] = {};
  if (violations.input.length >= 1) {
    logger.Test_Data["request"] = {};
    logger.Test_Data.request["message"] = [];
    violations.input.forEach((input) => {
      const code = input.code;
      const message = input.message;
      const path = input.path;
      logger.Test_Data.request.message = [
        ...logger.Test_Data.request.message,
        `${code || ""} - ${message} - ${path || ""}`,
      ];
    });
  }
  if (violations.output.length >= 1) {
    logger.Test_Data["response"] = {};
    logger.Test_Data.response["message"] = [];
    violations.output.forEach((output) => {
      const code = output.code;
      const message = output.message;
      const path = output.path;
      logger.Test_Data.response.message = [
        ...logger.Test_Data.response.message,
        `[${code || ""}]  ${message} in ${path || ""}`,
      ];
    });
  }

  return logger;
}

export const createErrorLogsFile =  async (logs) => {
  const [serviceTitle, servicesTests] = Object.entries(logs)[0];
  const prettyTests = servicesTests.reduce((str, test) => {
    //const treatedMessageResponse = test.messageResponse.split("-");
    const testStr = `Error ---${test.testTitle}---
    ${test.messageResponse || ""}
    ${test.messageRequest || ""}
    `;
    return `${str} ${testStr}`;
  }, "");
  await fs.writeFileSync(
    `output/${serviceTitle}.txt`,
    prettyTests,
    function (err) {}
  );
}