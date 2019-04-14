import axios from "axios";

import ClientComponentFactory, { ClientAbstractComponent } from "./ClientComponentFactory";
import OmigostFakeClient from "./FakeClient";
import CLIENT_URLS from "./clientUrls";

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
    getBudgets(): ResponsePromise;
    createBudget(data: any): ResponsePromise;
}

export class OmigostClient implements OmigostClientInterface {

    apiBase: string;
    component: ClientAbstractComponent;

    constructor(apiBase?: string) {
        this.apiBase = apiBase || CLIENT_URLS.apiBase;
        this.component = ClientComponentFactory(this);
    }

    createBudget(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.createBudget, data });
    }

    getBudgets(): ResponsePromise {
        return this.callEndpoint(null, CLIENT_URLS.getBudgets);
    }

    deleteBudget(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.deleteBudget, data });
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
                if ({}.toString.call(options.endpoint) === "[object Function]") {
                    url = options.endpoint(options);
                } else {
                    url = options.endpoint;
                }
            }

            url = `${this.apiBase}${url}`;

            axios({
                method,
                url,
                withCredentials: false,
                params,
                data: options.data,
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

/*
 * Uncomment this to use fake client
 */
//export default OmigostFakeClient;
//export default new OmigostCachedClient(OmigostFakeClient);
export default new OmigostClient();