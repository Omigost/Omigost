import { Action } from "./actions";

import { reducer as modulesReducer } from "../modules/ModulesRedux";
import { reducer as dialogsReducer } from "../components/universal/DialogProvider";
import { reducer as toastsReducer } from "../components/universal/ToastProvider";
import { reducer as themeReducer } from "../components/universal/ThemeProvider";
import { reducer as floatingActionReducer } from "../components/universal/FloatingActionProvider";

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
        themes: themeReducer,
        floatingActions: floatingActionReducer,
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