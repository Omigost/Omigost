import * as React from "react";
import styled  from "styled-components";

import { connect } from "react-redux";

import { IconName } from "@fortawesome/fontawesome-svg-core";
import FloatingActionProviderRaw from "./FloatingActionProviderRaw";

export enum Action {
    ShowAction = 'FLOATING_ACTION_SHOW',
    CancelAction = 'FLOATING_ACTION_CANCEL',
}

export interface FloatingActionOption {
    icon: IconName;
    description: string;
    onClick?: () => void;
}

export interface FloatingActionSpecs {
    title: string;
    description?: string;
    options: Array<FloatingActionOption>;
}

export interface ShowFloatingAction {
    type: Action.ShowAction;
    specs: FloatingActionSpecs;
}

export interface CancelFloatingAction {
    type: Action.CancelAction;
}

export function executeShowAction(actionSpecs: FloatingActionSpecs): ShowFloatingAction {
    return {
        type: Action.ShowAction,
        specs: actionSpecs,
    };
}

export function executeCancelAction(): CancelFloatingAction {
    return {
        type: Action.CancelAction,
    };
}

export interface FloatingActionsReduxState {
    currentAction: FloatingActionSpecs;
}

export const INITIAL_STATE: FloatingActionsReduxState = {
    currentAction: null,
}

export function reducer(stateIn: FloatingActionsReduxState, action): FloatingActionsReduxState {
    const state = stateIn || INITIAL_STATE;
    const actionType: Action = action.type;
    
    switch(actionType) {
        case Action.CancelAction: {
            return {
                ...state,
                currentAction: null,
            };
        }
        case Action.ShowAction: {
            return {
                ...state,
                currentAction: action.specs,
            };
        }
        default: {
            return state;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentFloatingAction: state.floatingActions.currentAction,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showAction: (action: FloatingActionSpecs) => {
            dispatch(executeShowAction(action));
        },
        cancelAction: () => {
            dispatch(executeCancelAction());
        },
    };
}

export function withFloatingActions(Component) {
    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Component);
}

interface FloatingActionConsumerRawProps {
    children: (props: any) => React.ReactNode;
}

class FloatingActionConsumerRaw extends React.Component<FloatingActionConsumerRawProps, undefined> {
    render() {
        return this.props.children(this.props);
    }
}

export const FloatingActionConsumer = withFloatingActions(FloatingActionConsumerRaw);

export default withFloatingActions(FloatingActionProviderRaw);