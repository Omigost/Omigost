import { AnyAction } from "redux";
import { Dispatch } from 'redux';

import { init, InitState } from "./init";

export enum Action {
    AppInit = 'APP_INIT',
};

export interface AppInitAction {
    type: Action.AppInit;
    stateUpdate: InitState;
};

export function executeAppInit(): AnyAction {
    return (((dispatch: Dispatch<any>) => {
        init().then((initState: InitState) => {
            dispatch({
                type: Action.AppInit,
                stateUpdate: initState,
            });
        });
    }) as unknown as AnyAction);
}