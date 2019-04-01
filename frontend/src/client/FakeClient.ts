import axios from "axios";

import {
    RequestMethod,
    ResponseData,
    ResponsePromise,
    RequestOptions,
    OmigostClientInterface,
} from "./OmigostClient";
import ClientComponentFactory, { ClientAbstractComponent } from "./ClientComponentFactory";

import fakeBudget from "./fakes/budget";

import { OmigostClient } from "./OmigostClient";
export class OmigostFakeClient implements OmigostClientInterface {
    
    component: ClientAbstractComponent;

    constructor(apiBase?: string) {
        this.component = ClientComponentFactory(this);
    }
    
    createBudget(data: any): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            resolve(null);
        });
        //return (new OmigostClient()).createBudget(data);
    }
    
    getBudgets(): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            const budgets = [];
            const count = Math.random()*20+1;
            for(let i=0;i<count;++i) {
                budgets.push(fakeBudget());
            }
            resolve(budgets);
        });
    }
    
    callEndpoint(endpoint, options): ResponsePromise {
        return new Promise<ResponseData>((resolve, reject) => {
            reject("Method 'callEndpoint' is not yet implemented");
        });
    }
}

export default new OmigostFakeClient();