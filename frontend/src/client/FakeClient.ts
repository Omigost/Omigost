
import ClientComponentFactory, { ClientAbstractComponent } from "./ClientComponentFactory";
import {
    OmigostClientInterface,
    ResponseData,
    ResponsePromise,
} from "./OmigostClient";
import {callFormEndpoint} from "./formHelpers";

import fakeBudget from "./fakes/budget";

function createSimplePromise(value: ResponseData): ResponsePromise {
    return new Promise<ResponseData>((resolve, reject) => {
        resolve(value);
    });
}

export class OmigostFakeClient implements OmigostClientInterface {

    component: ClientAbstractComponent;

    constructor(apiBase?: string) {
        this.component = ClientComponentFactory(this);
    }

    createBudget(data: any): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            resolve(null);
        });
    }

    getBudgets(): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            const budgets = [];
            const count = Math.random() * 20 + 1;
            for (let i=0;i < count;++i) {
                budgets.push(fakeBudget());
            }
            resolve(budgets);
        });
    }

    postBudgetIncreaseLimit(formContext, data): ResponsePromise {
        const fakeRequest = new Promise<ResponseData>((resolve, reject) => {
            return setTimeout(() => {
                if (data.reason === "TEST") return reject(new TypeError("the reason was rejected by backend"));
                const FAILURE_CHANCE = 0.2;

                const hasFailed = Math.random() < FAILURE_CHANCE;
                if (hasFailed) return reject("something went amiss, try again");
                return resolve("success!");
            }, 600);
        });
        return callFormEndpoint(() => fakeRequest, formContext, data);
    }

    deleteBudget(data): ResponsePromise {
        return createSimplePromise(null);
    }

    getUsers(): ResponsePromise {
        return createSimplePromise(null);
    }
    
    createUser(data): ResponsePromise {
        return createSimplePromise(null);
    }
    
    addCommunicationToUser(data): ResponsePromise {
        return createSimplePromise(null);
    }
    
    deleteUserCommunication(data): ResponsePromise {
        return createSimplePromise(null);
    }
    
    callEndpoint(endpoint, options): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            reject("Method 'callEndpoint' is not yet implemented");
        });
    }
}

export default new OmigostFakeClient();