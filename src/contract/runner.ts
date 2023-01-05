
import { IHttpOperation } from '@stoplight/types'
import { treatPath } from '../common/treatPath';
import { PrismHttp } from '@stoplight/prism-http/dist/client'
import { parseRequestBody } from '../misc/Utils';

export default async function runContractTests(operation:IHttpOperation<false>, client:PrismHttp) {
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