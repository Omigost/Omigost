
import ClientComponentFactory, { ClientAbstractComponent } from "./ClientComponentFactory";
import {
    OmigostClientInterface,
    ResponseData,
    ResponsePromise,
} from "./OmigostClient";


export type PromiseTransformer = (responsePromise: LazyPromise) => LazyPromise;
export type LazyPromise = () => ResponsePromise;

function createPromiseCacheTransformer(): PromiseTransformer {
    let lastData = null;

    return (responsePromise: LazyPromise) => () => {
        if (lastData) {
            return new Promise<ResponseData>((resolve, reject) => {
                resolve(lastData);
            });
        }
        return new Promise<ResponseData>((resolve, reject) => {
            responsePromise().then((data) => {
                if (data) {
                    lastData = data;
                }
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    };
}

export class PromisesCache {
    cache: Map<string, PromiseTransformer>;

    constructor() {
        this.cache = new Map();
    }

    transform(key: string, responsePromise: LazyPromise): LazyPromise {
        if (!this.cache.has(key)) {
            this.cache.set(key, createPromiseCacheTransformer());
        }
        return this.cache.get(key)(responsePromise);
    }
}

export class OmigostCachedClient implements OmigostClientInterface {

    component: ClientAbstractComponent;
    client: OmigostClientInterface;

    cache: PromisesCache;

    constructor(client: OmigostClientInterface) {
        this.client = client;
        this.component = ClientComponentFactory(this);

        this.cache = new PromisesCache();
    }

    createBudget(data): ResponsePromise {
        return this.client.createBudget(data);
    }

    getBudgets(): ResponsePromise {
        return this.cache.transform("getBudgets", this.client.getBudgets)();
    }

    postBudgetIncreaseLimit(formContext, data): ResponsePromise {
        return this.client.postBudgetIncreaseLimit(formContext, data);
    }

    callEndpoint(endpoint, options): ResponsePromise {
        return this.cache.transform(`callEndpoint(${endpoint}:${JSON.stringify(options)})`, () => this.client.callEndpoint(endpoint, options))();
    }
}