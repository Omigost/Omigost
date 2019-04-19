import * as React from "react";
import styled, { withTheme } from "styled-components";

import Dialog from "../Dialog";

export interface DialogSetContextProps {
    openDialog: (name: string) => void;
    closeDialog: (name: string) => void;
    enableDialogFullscreen: (name: string) => void;
    disableDialogFullscreen: (name: string) => void;
}

export interface DialogCurrentState {
    isOpen?: boolean;
    isFullscreen?: boolean;
    transparent?: boolean;
    content: React.Node;
    name: string;
    children: (contextProps: DialogSetContextProps) => React.Node;
}

export interface DialogSetProps {
    dialogs: Array<DialogCurrentState>;
    onChange: (dialogs: Array<DialogCurrentState>) => void;
}

export interface DialogSetState {
    width: string;
    height: string;
}

export default class DialogSet extends React.Component<DialogSetProps, undefined> {

    constructor(props) {
        super(props);
        
        this.modifyOneDialogState = this.modifyOneDialogState.bind(this);
    }

    modifyOneDialogState(name: string, transformFn: (dialog: DialogCurrentState) => DialogCurrentState) {
        this.props.onChange(this.props.dialogs.map(dialog => {
            if (dialog.name === name) {
                return transformFn(dialog);
            }
            return {...dialog};
        }));
    }
    
    render() {
        const contextProps = {
            openDialog: (name: string) => {
                this.modifyOneDialogState(name, dialog => ({
                    ...dialog,
                    isOpen: true,
                    isFullscreen: false,
                }));
            },
            closeDialog: (name: string) => {
                this.modifyOneDialogState(name, dialog => ({
                    ...dialog,
                    isOpen: false,
                }));
            },
            enableDialogFullscreen: (name: string) => {
                this.modifyOneDialogState(name, dialog => ({
                    ...dialog,
                    isFullscreen: true,
                }));
            },
            disableDialogFullscreen: (name: string) => {
                this.modifyOneDialogState(name, dialog => ({
                    ...dialog,
                    isFullscreen: false,
                }));
            },
        };
        
        return (
            <div>
                {
                    this.props.dialogs.map(dialog => {
                        return (
                            <Dialog
                                showButtonClose
                                showButtonFullscreen={!dialog.isFullscreen}
                                showButtonMinimize={dialog.isFullscreen}
                                {...dialog}
                                onFullscreen={() => {
                                    contextProps.enableDialogFullscreen(dialog.name);
                                }}
                                onClose={() => {
                                    contextProps.closeDialog(dialog.name);
                                }}
                                onMinimize={() => {
                                    contextProps.disableDialogFullscreen(dialog.name);
                                }}
                            >
                                {dialog.content}
                            </Dialog>
                        );
                    })
                }
                {this.props.children(contextProps)}
            </div>
        );
    }
}

