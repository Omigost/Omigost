
import ClientComponentFactory, { ClientAbstractComponent } from "./ClientComponentFactory";
import {
    OmigostClientInterface,
    ResponseData,
    ResponsePromise,
} from "./OmigostClient";

import { ToastActions } from "../components/universal/ToastProvider";

const idFn = (input: any) => {};

function wrapPromise(promise: ResponsePromise, whenOk: (data: any) => void, whenErr: (err: any) => void): ResponsePromise {
    return new Promise<ResponseData>((resolve, reject) => {
       promise.then((data) => {
           whenOk(data);
           resolve(data);
       }).catch((error) => {
           whenErr(error);
           reject(error);
       });
    });
}

export class OmigostToastifiedClient implements OmigostClientInterface {

    component: ClientAbstractComponent;
    client: OmigostClientInterface;
    toastActions: ToastActions;

    constructor(client: OmigostClientInterface, toastActions: ToastActions) {
        this.client = client;
        this.component = ClientComponentFactory(this);
        this.toastActions = toastActions;
    }

    createBudget(data): ResponsePromise {
        return wrapPromise(
            this.client.createBudget(data),
            (data) => {
                this.toastActions.displaySuccessToast("New budget was successfully created");
            },
            (error) => {
                this.toastActions.displayExceptionToast("Could not create new budget", error);
            },
        );
    }

    getBudgets(): ResponsePromise {
        return wrapPromise(
            this.client.getBudgets(),
            idFn,
            (error) => {
                this.toastActions.displayExceptionToast("Could not get budgets from server", error);
            },
        );
    }

    postBudgetIncreaseLimit(formContext, data): ResponsePromise {
        return wrapPromise(
            this.client.postBudgetIncreaseLimit(formContext, data),
            idFn,
            (error) => {
                this.toastActions.displayExceptionToast("Could not increase budgets limit", error);
            },
        );
    }

    deleteBudget(data): ResponsePromise {
        return wrapPromise(
            this.client.deleteBudget(data),
            (data) => {
                this.toastActions.displaySuccessToast("Budget was successfully deleted");
            },
            (error) => {
                this.toastActions.displayExceptionToast("Could not delete the given budget", error);
            },
        );
    }

    getUsers(): ResponsePromise {
        return wrapPromise(
            this.client.getUsers(),
            idFn,
            (error) => {
                this.toastActions.displayExceptionToast("Could not get users from server", error);
            },
        );
    }

    createUser(data): ResponsePromise {
        return wrapPromise(
            this.client.createUser(data),
            (data) => {
                this.toastActions.displaySuccessToast("New user was successfully created");
            },
            (error) => {
                this.toastActions.displayExceptionToast("Could not create new user", error);
            },
        );
    }

    addCommunicationToUser(data): ResponsePromise {
        return wrapPromise(
            this.client.addCommunicationToUser(data),
            (data) => {
                this.toastActions.displaySuccessToast("New communication method was added to user");
            },
            (error) => {
                this.toastActions.displayExceptionToast("Could not add communication method to user", error);
            },
        );
    }

    deleteUserCommunication(data): ResponsePromise {
        return wrapPromise(
            this.client.deleteUserCommunication(data),
            (data) => {
                this.toastActions.displaySuccessToast("Communication method was removed for user");
            },
            (error) => {
                this.toastActions.displayExceptionToast("Could not remove the communication method for user", error);
            },
        );
    }

    callEndpoint(endpoint, options): ResponsePromise {
        return this.client.callEndpoint(endpoint, options);
    }
}