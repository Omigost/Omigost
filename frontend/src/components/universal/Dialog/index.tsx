import * as React from "react";
import styled, { withTheme } from "styled-components";

import { withRegisteredDialog, ConnectedProps, DialogsConsumer } from "../DialogProvider";

import Modal from "react-modal";
import { Rnd } from "react-rnd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContent = styled.div`
  width: 100%;
  height: 100%;

  & > div {
    position: relative !important;
    top: 0 !important;
    left: 0 !important;
    transform: translate(0px, 0px) !important;
  }
`;

const CardBoxHandle = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.colors.accent};
  opacity: 0.3;
  position: relative;
  top: 0.2vw;
  left: 0.2vw;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const CardBoxRemove = styled.div`
  display: block;
  color: ${(props) => props.theme.colors.accent};
  opacity: 0.5;
  position: relative;
  cursor: pointer;
  margin-left: auto;
  width: 3vw;
  height: 3vw;
  text-align: center;

  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const CardBoxContent = styled.div`
    margin: 1vw;
    height: 89%;
    width: 100%;
`;

const CardBoxWrapper = styled.div<CardBoxWrapperProps>`
  width: 100%;
  height: 100%;
  border-radius: 0.5vw;
  background: ${(props: CardBoxWrapperProps) => (props.transparent) ? ("transparent") : ("#ffffff")};
  box-shadow: ${(props: CardBoxWrapperProps) => (props.transparent) ? ("none") : ("0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1)")};

  min-width: ${(props: CardBoxWrapperProps) => ((props.minWidth) ? (props.minWidth + "vw") : ("unset"))}
`;

export interface DialogState {
    width: string;
    height: string;
}

export interface CardBoxWrapperProps {
    transparent?: boolean;
    minWidth?: number;
}

export interface DialogProps {
    isOpen: boolean;
    isFullscreen: boolean;
    showButtonClose?: boolean;
    showButtonFullscreen?: boolean;
    showButtonMinimize?: boolean;
    onClose?: () => void;
    onFullscreen?: () => void;
    onMinimize?: () => void;
    transparent?: boolean;
    minWidth?: number;
    children: (props: ConnectedProps) => React.ReactNode;
}

class Dialog extends React.Component<DialogProps, DialogState> {
    state: DialogState;

    constructor(props) {
        super(props);

        this.state = {
            width: null,
            height: null,
        };
    }

    render() {

        if (!this.props.isOpen) {
            return null;
        }

        const showButtonFullscreen = this.props.showButtonFullscreen || true;
        const showButtonMinimize = this.props.showButtonMinimize || true;
        const showButtonClose = this.props.showButtonClose || true;
        const onClose = this.props.onClose;

        return (
            <Modal
                isOpen={this.props.isOpen}
                style={{
                    overlay: {
                        zIndex: "9999999",
                        background: "rgba(0, 0, 0, 0.3)",
                    },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        paddingLeft: "0",
                        paddingTop: "0",
                        background: "transparent",
                        border: "none",
                        overflow: "visible",
                    },
                }}
                contentLabel="Example Modal"
            >
                <ModalContent>
                    <Rnd
                        disableDragging
                        enableResizing={false}
                        size={(this.props.isFullscreen) ? ({
                            width: "90vw",
                            height: "85vh",
                        }) : ((this.state.width === null || this.state.height === null) ? (null) : ({
                            width: this.state.width,
                            height: this.state.height,
                        }))}
                    >
                        <CardBoxWrapper {...this.props}>
                            {
                                (!this.props.transparent && !this.props.isFullscreen && this.props.onFullscreen && showButtonFullscreen) ? (
                                    <CardBoxHandle
                                        className="handle"
                                        onClick={() => {
                                            this.props.onFullscreen();
                                        }}
                                    >
                                        <FontAwesomeIcon icon="expand"/>
                                    </CardBoxHandle>
                                ) : (null)
                            }
                            {
                                (!this.props.transparent && this.props.isFullscreen && this.props.onMinimize && showButtonMinimize) ? (
                                    <CardBoxHandle
                                        className="handle"
                                        onClick={() => {
                                            this.props.onMinimize();
                                        }}
                                    >
                                        <FontAwesomeIcon icon="compress"/>
                                    </CardBoxHandle>
                                ) : (null)
                            }
                            {
                                (onClose && showButtonClose) ? (
                                    <CardBoxRemove
                                        onClick={() => {
                                            onClose();
                                        }}
                                    >
                                        <FontAwesomeIcon icon="times" />
                                    </CardBoxRemove>
                                ) : (null)
                            }
                            <CardBoxContent>
                                <DialogsConsumer {...this.props}>
                                    {this.props.children}
                                </DialogsConsumer>
                            </CardBoxContent>
                        </CardBoxWrapper>
                    </Rnd>
                </ModalContent>
            </Modal>
        );
    }
}

export default withTheme(withRegisteredDialog(Dialog));

