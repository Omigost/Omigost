import * as React from "react";
import {ResponsePromise} from "./OmigostClient";

export enum REQUEST_STATES {
    READY,
    IN_PROGRESS,
    SUCCESS,
    ERROR,
}

export type FormState = {
    requestState: REQUEST_STATES,
    error: string,
};

export type FormComponentContext = React.Component<any, FormState>;


export function callFormEndpoint(callEndpoint: (endpoint, options) => ResponsePromise, formContext: FormComponentContext, options): ResponsePromise {
    return handleFormSubmission(
        formContext,
        () => callEndpoint(null, options),
    );
}

function handleFormSubmission(formContext: FormComponentContext, request: () => ResponsePromise): ResponsePromise {
    formContext.setState({requestState: REQUEST_STATES.IN_PROGRESS});

    return request()
        .then(() => formContext.setState({requestState: REQUEST_STATES.SUCCESS}))
        .catch(err => formContext.setState({requestState: REQUEST_STATES.ERROR, error: err.toString()}));

}
