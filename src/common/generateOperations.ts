import { getHttpOperationsFromSpec } from "@stoplight/prism-cli/dist/operations";
import { createClientFromOperations } from "@stoplight/prism-http/dist/client"
import { IClientConfig } from "../misc/types";


export const getData = async (path:string, prismConfig:IClientConfig) => { 
        const operations = await getHttpOperationsFromSpec(`${path}`);
        const client = createClientFromOperations(operations, prismConfig);
        
        return { operations, client};
    }
    