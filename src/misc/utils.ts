import fs from 'fs'



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



export const pathReplaceVar =  async (str, toReplace) => {
  return str.replace(/\{.+?\}/, toReplace);
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