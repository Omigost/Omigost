import { Action } from "./actions";

import { reducer as modulesReducer } from "../modules/ModulesRedux";
import { reducer as dialogsReducer } from "../components/universal/DialogProvider";
import { reducer as toastsReducer } from "../components/universal/ToastProvider";

export interface AppState {
    appIsInitialized: boolean;
};

export const INITIAL_STATE: AppState = {
    appIsInitialized: false,
};

export default function createRootReducer(history) {
    return {
        modules: modulesReducer,
        dialogs: dialogsReducer,
        toasts: toastsReducer,
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