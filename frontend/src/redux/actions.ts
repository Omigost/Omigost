import { init, InitState } from "./init";

export enum Action {
    AppInit = 'APP_INIT';
};

export interface AppInitAction {
    type: Action.AppInit;
    stateUpdate: InitState;
};

export function executeAppInit(): AppInitAction {
    return dispatch => {
        init().then((initState: InitState) => {
            dispatch({
                type: Action.AppInit,
                stateUpdate: initState,
            });
        });
    };
}