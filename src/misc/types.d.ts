import {IHttpConfig} from "@stoplight/prism-http";
import * as pino from 'pino';

export declare type IClientConfig = IHttpConfig & {
    baseUrl?: string;
    logger?: pino.Logger;
};