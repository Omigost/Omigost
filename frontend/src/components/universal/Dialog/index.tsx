import * as React from "react";
import styled, { withTheme } from "styled-components";

import { withRegisteredDialog, DialogsConsumer } from "../DialogProvider";

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
  display: inline-block;
  color: ${(props) => props.theme.colors.accent};
  opacity: 0.3;
  position: relative;
  top: 0.2vw;
  left: 0.2vw;
  cursor: pointer;
  margin-left: 0.4vw;

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

const CardBoxWrapper = styled.div<DialogProps>`
  width: 100%;
  height: 100%;
  border-radius: 0.5vw;
  background: ${(props: DialogProps) => (props.transparent) ? ("transparent") : ("#ffffff")};
  box-shadow: ${(props: DialogProps) => (props.transparent) ? ("none") : ("0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1)")};

  min-width: ${(props: DialogProps) => ((props.minWidth) ? (props.minWidth + "vw") : ("unset"))}
`;

export interface DialogState {
    width: string;
    height: string;
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

        const showButtonFullscreen = (this.props.showButtonFullscreen === false) ? (false) : (true);
        const showButtonMinimize = (this.props.showButtonMinimize === false) ? (false) : (true);
        const showButtonClose = (this.props.showButtonClose === false) ? (false) : (true);

        return (
            <Modal
                isOpen={this.props.isOpen}
                style={{
                    overlay: {
                        zIndex: "9999999",
                        background: "rgba(0, 0, 0, 0.49019607843137253)",
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
                        size={(this.props.isFullscreen) ? ({
                            width: "90vw",
                            height: "85vh",
                        }) : ((this.state.width === null || this.state.height === null) ? (null) : ({
                            width: this.state.width,
                            height: this.state.height,
                        }))}
                        onResize={(e, direction, ref, delta, position) => {
                            this.setState({
                                width: ref.style.width,
                                height: ref.style.height,
                                ...position,
                            });
                        }}
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
                                (!this.props.transparent && this.props.onClose && showButtonClose) ? (
                                    <CardBoxRemove
                                        onClick={() => {
                                            this.props.onClose();
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

