import { Action } from "./actions";

import { reducer as modulesReducer } from "../modules/ModulesRedux";

export interface AppState {
    appIsInitialized: boolean;
};

export const INITIAL_STATE: AppState = {
    appIsInitialized: false,
};

export default function createRootReducer(history) {
    return {
        modules: modulesReducer,
        app: (stateIn: AppState, action): AppState => {
            const state = stateIn || INITIAL_STATE;
            const actionType: Action = action.type;
            
            switch(actionType) {
                case Action.AppInit: {
                    return {
                        ...state,
                        appIsInitialized: true,
                    };
                }
                default: {
                    return state;
                }
            }
        },
    };
}