import * as React from "react";
import styled  from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";

import {
    dismiss,
    error,
    info, message, success, toastsReducer as toasts,
    update, warning, ToastContainer,
} from "react-toastify-redux";

export const reducer = toasts;

export function executeDismissToast(id?: string) {
    return dismiss(id);
}

export function executeUpdateToast(id?: string, options?: any) {
    return update(id, options);
}

export function executeShowErrorToast(messageContent: string) {
    return error(messageContent);
}

export function executeShowExceptionToast(messageContent: string, errorPayload: any) {
    const payload = {
        messageContent,
        errorPayload,
    };

    return error(payload as unknown as any);
}

export function executeShowMessageToast(messageContent: string) {
    return message(messageContent);
}

export function executeShowWarningToast(messageContent: string) {
    return warning(messageContent);
}

export function executeShowSuccessToast(messageContent: string) {
    return success(messageContent);
}

export function executeShowInfoToast(messageContent: string) {
    return info(messageContent);
}

export interface ToastProviderProps {

}

export const ToastComponent = (props: any) => {
    const { type, message } = props;

    if (typeof message === "string") {
        return (
            <div className="toast">
                <div className="header">{type}</div>
                <div className="message">{message}</div>
            </div>
        );
    } else if (message && (message.messageContent || message.errorPayload)) {
        return (
            <div className="toast">
                <div className="header">Error</div>
                <div className="message">
                    <p>{message.messageContent}</p>
                    <p>
                        {"" + message.errorPayload}
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="toast">
                <div className="header">Error</div>
                <div className="message">
                    <p>Unknown error has occured.</p>
                    <p>
                        {JSON.stringify(message, null, 2)}
                    </p>
                </div>
            </div>
        );
    }
};

const Wrapper = styled.div`
  .Toastify__toast--success {
    background: #54c55e;
    box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
  }
`;

export default class ToastProvider extends React.Component<ToastProviderProps, undefined> {
    render() {
        return (
            <Wrapper>
                <ToastContainer
                    toastComponent={ToastComponent}
                    position={toast.POSITION.TOP_RIGHT}
                />
            </Wrapper>
        );
    }
}

export interface ToastActions {
    dismissToast: (id?: string) => void;
    updateToast: (id?: string, options?: any) => void;
    displayErrorToast: (messageContent: string) => void;
    displayExceptionToast: (messageContent: string, errorPayload: any) => void;
    displayMessageToast: (messageContent: string) => void;
    displayWarningToast: (messageContent: string) => void;
    displaySuccessToast: (messageContent: string) => void;
    displayInfoToast: (messageContent: string) => void;
}

export function withToasts(Component) {
    return connect(
        (state, ownProps) => {
            return {};
        },
        (dispatch, ownProps): ToastActions => {
            return {
                dismissToast: (id?: string) => {
                    dispatch(executeDismissToast());
                },
                updateToast: (id?: string, options?: any) => {
                    dispatch(executeUpdateToast(id, options));
                },
                displayErrorToast: (messageContent: string) => {
                    dispatch(executeShowErrorToast(messageContent));
                },
                displayExceptionToast: (messageContent: string, errorPayload: any) => {
                    dispatch(executeShowExceptionToast(messageContent, errorPayload));
                },
                displayMessageToast: (messageContent: string) => {
                    dispatch(executeShowMessageToast(messageContent));
                },
                displayWarningToast: (messageContent: string) => {
                    dispatch(executeShowWarningToast(messageContent));
                },
                displaySuccessToast: (messageContent: string) => {
                    dispatch(executeShowSuccessToast(messageContent));
                },
                displayInfoToast: (messageContent: string) => {
                    dispatch(executeShowInfoToast(messageContent));
                },
            };
        },
    )(Component);
}
