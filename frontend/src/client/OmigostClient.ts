import axios from "axios";

import CLIENT_URLS from "./clientUrls";
import ClientComponentFactory, { ClientAbstractComponent } from "./ClientComponentFactory";

export enum RequestMethod {
    GET = "get",
    POST = "post",
}

export type ResponseData = any;

export type ResponsePromise = Promise<ResponseData>;

export interface RequestOptions {
    endpoint?: string;
    params?: any;
    method?: RequestMethod;
}

export interface OmigostClientInterface {
    callEndpoint(endpoint?: string, options?: RequestOptions): Promise<ResponseData>;
}

export class OmigostClient implements OmigostClientInterface {
    
    apiBase: string;
    component: ClientAbstractComponent;

    constructor(apiBase?: string) {
        this.apiBase = apiBase || CLIENT_URLS.apiBase;
        this.component = ClientComponentFactory(this);
    }
    
    getBudgets(): ResponsePromise {
        return this.callEndpoint(null, CLIENT_URLS.getBudgets);
    }
    
    callEndpoint(endpoint, options): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            let method = "get";
            if (options && options.method) {
                method = options.method;
            }

            let params = {};
            if (options && options.params) {
                params = options.params;
            }

            let url = "/";
            if (endpoint) {
                url = endpoint;
            } else if (options && options.endpoint) {
                url = options.endpoint;
            }
            
            url = `${this.apiBase}${url}`;

            axios({
                method,
                url,
                withCredentials: true,
                params,
            }).then((response) => {
                const data: ResponseData = response.data || {};
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data || {});
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default new OmigostClient();