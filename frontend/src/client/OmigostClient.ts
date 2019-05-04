import axios from "axios";

import ClientComponentFactory, { ClientAbstractComponent } from "./ClientComponentFactory";
import CLIENT_URLS from "./clientUrls";
import {callFormEndpoint, FormComponentContext} from "./formHelpers";

export enum RequestMethod {
    GET = "get",
    POST = "post",
}

export type ResponseData = any;

export type ResponsePromise = Promise<ResponseData>;

export type PostBudgetIncreaseLimitPayload = {reason: string, token: string};

export interface RequestOptions {
    endpoint?: string;
    params?: any;
    method?: RequestMethod;
}

export interface OmigostClientInterface {
    callEndpoint(endpoint?: string, options?: RequestOptions): Promise<ResponseData>;
    getBudgets(data: any): ResponsePromise;
    getUsers(): ResponsePromise;
    getUserSpendings(data: any): ResponsePromise;
    postBudgetIncreaseLimit(formContext: FormComponentContext, data: PostBudgetIncreaseLimitPayload): ResponsePromise;
    createBudget(data: any): ResponsePromise;
    deleteBudget(data: any): ResponsePromise;
    createUser(data: any): ResponsePromise;
    addCommunicationToUser(data: any): ResponsePromise;
    deleteUserCommunication(data: any): ResponsePromise;
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

    getBudgets(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.getBudgets, data });
    }

    postBudgetIncreaseLimit(formContext, data): ResponsePromise {
        return this.submitForm(formContext, { ...CLIENT_URLS.postBudgetIncreaseLimit, data });
    }

    submitForm(formContext, options) {
        return callFormEndpoint(this.callEndpoint.bind(this), formContext, options);
    }

    deleteBudget(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.deleteBudget, data });
    }

    getUsers(): ResponsePromise {
        return this.callEndpoint(null, CLIENT_URLS.getUsers);
    }

    getUserSpendings(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.getUserSpendings, data });
    }

    createUser(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.createUser, data });
    }

    addCommunicationToUser(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.addCommunicationToUser, data });
    }

    deleteUserCommunication(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.deleteUserCommunication, data });
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
export default new OmigostClient();
