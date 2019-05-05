import axios from "axios";
import * as moment from "moment";

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
    getAccounts(): ResponsePromise;
    getUserSpendings(data: any): ResponsePromise;
    postBudgetIncreaseLimit(formContext: FormComponentContext, data: PostBudgetIncreaseLimitPayload): ResponsePromise;
    createBudget(data: any): ResponsePromise;
    createSeparateBudget(data: any): ResponsePromise;
    deleteBudget(data: any): ResponsePromise;
    createUser(data: any): ResponsePromise;
    deleteUser(data: any): ResponsePromise;
    addCommunicationToUser(data: any): ResponsePromise;
    addAccountToUser(data: any): ResponsePromise;
    deleteUserCommunication(data: any): ResponsePromise;
    deleteAccountFromUser(data: any): ResponsePromise;
    getRecentEC2CostAllocationTags(): ResponsePromise;
    getSettings(): ResponsePromise;
    updateSettings(data: any): ResponsePromise;
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

    createSeparateBudget(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.createSeparateBudget, data });
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

    getAccounts(): ResponsePromise {
        return this.callEndpoint(null, CLIENT_URLS.getAccounts);
    }

    getUserSpendings(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.getUserSpendings, data });
    }

    createUser(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.createUser, data });
    }

    deleteUser(data): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            this.getUsers().then(users => {
                const userToDelete = users.find(user => user.name === data.name);
                Promise.all(
                    userToDelete.communications.map(com => this.deleteUserCommunication({
                        userName: userToDelete.name,
                        communicationName: com.name,
                        communicationValue: com.value,
                    })),
                ).then(() => {
                    Promise.all(
                        userToDelete.accounts.map(acc => this.deleteAccountFromUser({
                            userName: userToDelete.name,
                            accountName: acc.name,
                        })),
                    ).then(() => {
                        this.callEndpoint(null, { ...CLIENT_URLS.deleteUser, data }).then((outputData) => {
                            resolve(outputData);
                        });
                    });
                });
            });
        });
    }

    addCommunicationToUser(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.addCommunicationToUser, data });
    }

    addAccountToUser(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.addAccountToUser, data });
    }

    deleteUserCommunication(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.deleteUserCommunication, data });
    }

    deleteAccountFromUser(data): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.deleteAccountFromUser, data });
    }

    getRecentEC2CostAllocationTags(): ResponsePromise {
        const endDate = moment().format("YYYY-MM-DD");
        const startDate = moment().subtract(90, "days").format("YYYY-MM-DD");
        return this.callEndpoint(null, {
            ...CLIENT_URLS.getRecentEC2CostAllocationTags,
            data: {
                startDate,
                endDate,
            },
        });
    }
    
    getSettings(): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.getSettings });
    }
    
    updateSettings(data: any): ResponsePromise {
        return this.callEndpoint(null, { ...CLIENT_URLS.updateSettings, data });
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
