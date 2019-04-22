import { OmigostModuleInstance, OmigostModule } from "./ModulesProvider";
import { connect } from "react-redux";

export enum Action {
    LoadModuleInstance = 'MODULES_LOAD_INSTANCE';
    EnableModule = 'MODULES_ENABLE';
    DisableModule = 'MODULES_DISABLE';
    SetModuleSettings = 'MODULES_SET_SETTINGS';
};

export interface EnableModuleAction {
    type: Action.EnableModule;
    instance: OmigostModuleInstance;
};

export interface DisableModuleAction {
    type: Action.DisableModule;
    module: OmigostModule;
};

export interface LoadModuleInstanceAction {
    type: Action.LoadModuleInstance;
    module: OmigostModule;
};

export interface SetModuleSettingsAction {
    type: Action.SetModuleSettings;
    module: OmigostModule;
    settings: any;
};

export function executeLoadModuleInstance(instance: OmigostModuleInstance): LoadModuleInstanceAction {
    return {
        type: Action.LoadModuleInstance,
        instance,
    };
}

export function executeEnableModule(module: OmigostModule): EnableModuleAction {
    return {
        type: Action.EnableModule,
        module,
    };
};

export function executeDisableModule(module: OmigostModule): DisableModuleAction {
    return {
        type: Action.DisableModule,
        module,
    };
};

export function executeSetModuleSettings(module: OmigostModule, settings: any): SetModuleSettingsAction {
    return {
        type: Action.SetModuleSettings,
        module,
        settings,
    };
};

const mapProviderStateToProps = (state, ownProps) => {
    return {
        instances: state.modules.instances,
        settings: state.modules.settings,
    };
}

const mapProviderDispatchToProps = (dispatch, ownProps) => {
    return {
        putInstance: (instance: OmigostModuleInstance) => {
            dispatch(executeLoadModuleInstance(instance));
        },
        enable: (module: OmigostModule) => {
            dispatch(executeEnableModule(module));
        },
        disable: (module: OmigostModule) => {
            dispatch(executeDisableModule(module));
        },
        setSettings: (module: OmigostModule, settings: any) => {
            dispatch(executeSetModuleSettings(module, settings));
        },
    };
}

export function connectProvider(provider) {
    return connect(
        mapProviderStateToProps,
        mapProviderDispatchToProps,
    )(provider);
}

export interface ModulesSettingsMapping {
    [key: string]: any;
}

export interface ModulesState {
    instances: Array<OmigostModuleInstance>;
    settings: ModulesSettingsMapping;
};

export const INITIAL_STATE: ModulesState = {
    instances: [],
    settings: {},
};

export function reducer(stateIn: ModulesState, action) {
    const state = stateIn || INITIAL_STATE;
    const actionType: Action = action.type;
    
    console.error(actionType);
    console.error(JSON.stringify(state, null, 2));
    switch(actionType) {
        case Action.LoadModuleInstance: {
            return {
                ...state,
                instances: [
                    ...state.instances,
                    action.instance
                ],
            };
        }
        case Action.EnableModule: {
            return {
                ...state,
                instances: state.instances.map(instance => {
                    if (action.module === instance.module) {
                        return {
                            ...instance,
                            activated: true,
                        };
                    }
                    return instance;
                })
            };
        }
        case Action.DisableModule: {
            return {
                ...state,
                instances: state.instances.map(instance => {
                    if (action.module === instance.module) {
                        return {
                            ...instance,
                            activated: false,
                        };
                    }
                    return instance;
                })
            };
        }
        case Action.SetModuleSettings: {
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.module.getName()]: action.settings,
                },
            };
        }
        default: {
            return state;
        }
    }
}
