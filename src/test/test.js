import { getHttpOperationsFromSpec } from "@stoplight/prism-cli/dist/operations"
import { createClientFromOperations } from "@stoplight/prism-http/dist/client"
import { resolve } from "path"
import { URL } from "url"
import Utils from "../misc/Utils"

let operations;

// main function
export default function test (){

  before(
  // before function
    async () => {
      operations = await getHttpOperationsFromSpec(
        resolve(__dirname, "../docs/example-api.yaml")
      );
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
      describe("Rates cacturne", () => {
        // describe function
        operations.forEach((operation) => {
          it(`${operation.iid} @contract`, async () => {
            let response;
            try {
              response = await Utils.runContractTests(operation, client);
  
              await response.violations.input.should.have.lengthOf(0);
              await response.violations.output.should.have.lengthOf(0);
            } catch (error) {
              const errorLogger = await Utils.logger_testData(response, error);
              throw errorLogger;
            }
          });
        });
      });}
  );
  it("This is a required placeholder to allow before() to work @contract", 
    function () {
      console.log("Mocha should not require this hack IMHO");
    }
  );
  
}
