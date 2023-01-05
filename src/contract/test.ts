import { getHttpOperationsFromSpec } from "@stoplight/prism-cli/dist/operations"
import { createClientFromOperations } from "@stoplight/prism-http/dist/client"
import { resolve } from "path"
import { URL } from "url"
import Utils, { getData } from "../misc/Utils"
import { prismClientConfig } from "../misc/const"
import { wrapper } from "../contract/wrapper"

let operations;

// main function
export default function test (){

    before(
  // before function
    async () => {
        getData("docs/example-api.yaml", prismClientConfig)
        wrapper(fileName, operations, client);
    }
    );
    it("This is a required placeholder to allow before() to work @contract", 
        function () {
        console.log("Mocha should not require this hack IMHO");
        }  
    );
    
}
