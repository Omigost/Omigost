import * as React from "react";
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";

export enum Action {
    RegisterDialog = 'DIALOGS_REGISTER_NEW_DIALOG';
    OpenDialog = 'DIALOGS_OPEN_DIALOG';
    CloseDialog = 'DIALOGS_CLOSE_DIALOG';
    EnableDialogFullscreen = 'DIALOGS_ENABLE_DIALOG_FULLSCREEN';
    DisableDialogFullscreen = 'DIALOGS_DISABLE_DIALOG_FULLSCREEN';
};

export interface RegisterDialogAction {
    type: Action.RegisterDialog;
    name: string;
};

export interface OpenDialogAction {
    type: Action.OpenDialog;
    name: string;
    parameters: any;
};

export interface CloseDialogAction {
    type: Action.CloseDialog;
    name: string;
};

export interface EnableDialogFullscreenAction {
    type: Action.EnableDialogFullscreen;
    name: string;
};

export interface DisableDialogFullscreenAction {
    type: Action.DisableDialogFullscreen;
    name: string;
};

export function executeRegisterDialog(name: string): RegisterDialogAction {
    return {
        type: Action.RegisterDialog,
        name,
    };
}

export function executeOpenDialog(name: string, parameters: any): OpenDialogAction {
    return {
        type: Action.OpenDialog,
        name,
        parameters,
    };
}

export function executeCloseDialog(name: string): CloseDialogAction {
    return {
        type: Action.CloseDialog,
        name,
    };
}

export function executeEnableDialogFullscreen(name: string): EnableDialogFullscreenAction {
    return {
        type: Action.EnableDialogFullscreen,
        name,
    };
}

export function executeDisableDialogFullscreen(name: string): DisableDialogFullscreenAction {
    return {
        type: Action.DisableDialogFullscreen,
        name,
    };
}

export interface DialogSpecs {
    name: string;
    isOpen: boolean;
    isFullscreen: boolean;
}

export interface DialogsReduxState {
    loadedDialogs: Array<DialogSpecs>;
};

export const INITIAL_STATE: DialogsReduxState = {
    loadedDialogs: [],
};

function mapSingleDialog(dialogs: Array<DialogSpecs>, name: string, transformFn: (dialog: DialogSpecs) => DialogSpecs): Array<DialogSpecs> {
    return dialogs.map(dialog => {
       if (dialog.name === name) {
            return { ...dialog, ...transformFn(dialog) }; 
       }
       return { ...dialog };
    });
}

export function reducer(stateIn: DialogsReduxState, action): DialogsReduxState {
    const state = stateIn || INITIAL_STATE;
    const actionType: Action = action.type;
    
    switch(actionType) {
        case Action.OpenDialog: {
            return {
                ...state,
                loadedDialogs: mapSingleDialog(state.loadedDialogs, action.name, (dialog) => {
                    return {
                        isOpen: true,
                        parameters: action.parameters,
                    };
                }),
            };
        }
        case Action.CloseDialog: {
            return {
                ...state,
                loadedDialogs: mapSingleDialog(state.loadedDialogs, action.name, (dialog) => {
                    return {
                        isOpen: false,
                    };
                }),
            };
        }
        case Action.EnableDialogFullscreen: {
            return {
                ...state,
                loadedDialogs: mapSingleDialog(state.loadedDialogs, action.name, (dialog) => {
                    return {
                        isFullscreen: true,
                    };
                }),
            };
        }
        case Action.DisableDialogFullscreen: {
            return {
                ...state,
                loadedDialogs: mapSingleDialog(state.loadedDialogs, action.name, (dialog) => {
                    return {
                        isFullscreen: false,
                    };
                }),
            };
        }
        case Action.RegisterDialog: {
            if (state.loadedDialogs.find(dialog => dialog.name === action.name)) {
                return state;
            }
            return {
                ...state,
                loadedDialogs: [
                    ...state.loadedDialogs,
                    {
                        name: action.name,
                        isOpen: false,
                        isFullscreen: false,
                        parameters: null,
                    }
                ],
            };
        }
        default: {
            return state;
        }
    }
}

const mapProviderStateToProps = (state, ownProps) => {
    const dialog = state.dialogs.loadedDialogs.find(dialog => dialog.name === ownProps.name);
    return {
        ...dialog,
    };
}

const mapProviderDispatchToProps = (dispatch, ownProps) => {
    return {
        registerDialog: () => {
            dispatch(executeRegisterDialog(ownProps.name));
        },
        onClose: () => {
            dispatch(executeCloseDialog(ownProps.name));
        },
        onFullscreen: () => {
            dispatch(executeEnableDialogFullscreen(ownProps.name));
        },
        onMinimize: () => {
            dispatch(executeDisableDialogFullscreen(ownProps.name));
        },
    };
}

export function withRegisteredDialog(Component) {
    return connect(
        mapProviderStateToProps,
        mapProviderDispatchToProps,
    )(
        class extends React.Component<any, undefined> {
            componentDidMount() {
                this.props.registerDialog();
            }
            
            render() {
                return (
                    <Component
                        {...this.props}
                    />
                );
            }
        }
    );
};

export function withDialogs(Component) {
    return connect(
        (state, ownProps) => {
            if (ownProps.name) {
                const dialog = state.dialogs.loadedDialogs.find(dialog => dialog.name === ownProps.name);
                return {
                    ...dialog,
                };
            }
            return {};
        },
        (dispatch, ownProps) => {
            return {
                openDialog: (name: string, parameters: any) => {
                    dispatch(executeOpenDialog(name || ownProps.name, parameters));
                },
                closeDialog: (name: string) => {
                    dispatch(executeCloseDialog(name || ownProps.name));
                },
                maximizeDialog: (name: string) => {
                    dispatch(executeEnableDialogFullscreen(name || ownProps.name));
                },
                minimizeDialog: (name: string) => {
                    dispatch(executeDisableDialogFullscreen(name || ownProps.name));
                },
            };
        },
    )(Component);
};

export class DialogsConsumerRaw extends React.Component<any, undefined> {    
    render() {
        return this.props.children(this.props);
    }
}

export const DialogsConsumer = withDialogs(DialogsConsumerRaw);

