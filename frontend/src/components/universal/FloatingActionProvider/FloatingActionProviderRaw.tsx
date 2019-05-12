import * as React from "react";
import * as ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatingActionSpecs } from "./index";

import {
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../Tooltip";

const showActionAnimation = keyframes`
    from {
        margin-left: 100vw;
    }
    to {
        margin-left: 0;
    }
`;

const FloatingActionsContainer = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

const FloatingAction = styled.div`
  position: fixed;
  bottom 4vh;
  left: 70vw;
  background-color: ${(props) => props.theme.colors.accent};
  font-family: ${(props) => props.theme.primaryFont};
  padding: 1vw;
  width: 30vw;
  color: white;

  animation: ${showActionAnimation} 0.7s normal ease-in-out;
  transition: background-color 0.3s linear;

  &:hover {
      background-color: ${(props) => props.theme.colors.primary};
  }

  & .actionContentHover {
      transition: opacity 0.3s linear;
      opacity: 0;
  }

  &:hover .actionContentHover {
      opacity: 1;
  }

  & .actionContentNormal {
      transition: opacity 0.3s linear;
      opacity: 1;
  }

  &:hover .actionContentNormal {
      opacity: 0;
  }
`;

const ActionContentNormal = styled.div``;

const ActionContentHover = styled.div`
    margin-top: 1vw;
    position: absolute;
    top: 0;
`;

const ActionTitle = styled.div`
  font-size: 1.5vw;
`;

const ActionDescription = styled.div`
  font-size: 1vw;
`;

const ActionTitleHover = styled.div`
  margin-top: 1vw;
  font-weight: bold;
  display: inline-block;
  margin-right: 2vw;
`;

const ActionActionsPanelHover = styled.div`
  display: inline-block;
`;

const OptionIconWrapper = styled.div`
  display: inline-block;
  padding: 0.3vw;
  background: white;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  border: 0.3vw solid transparent;
  border-radius: 1vw;
  margin-left: 1vw;

  width: 1.5vw;
  height: 1.5vw;
  text-align: center;

  &:hover {
      border: 0.3vw solid white;
      background: transparent;
      color: white;
  }
`;

export interface FloatingActionProviderProps {
    showAction: (action: FloatingActionSpecs) => void;
    cancelAction: () => void;
    currentFloatingAction: FloatingActionSpecs;
}

class FloatingActionProviderRaw extends React.Component<FloatingActionProviderProps, undefined> {
    render() {
        const specs = this.props.currentFloatingAction;

        const contentNode = (
            <FloatingActionsContainer>
                {(specs) ? (
                    <FloatingAction>
                        <ActionContentNormal className="actionContentNormal">
                            <ActionTitle>
                                {specs.title}
                            </ActionTitle>
                            <ActionDescription>
                                {specs.description}
                            </ActionDescription>
                        </ActionContentNormal>
                        <ActionContentHover className="actionContentHover">
                            <ActionTitleHover>
                                Actions:
                            </ActionTitleHover>
                            <ActionActionsPanelHover>
                                {(specs.options || []).concat([
                                    {
                                        description: "Ignore this message",
                                        icon: faTimes.iconName,
                                        onClick: () => {
                                            this.props.cancelAction();
                                        },
                                    },
                                ]).map(option => {
                                    return (
                                        <OptionIconWrapper
                                            onClick={option.onClick}
                                        >
                                            <Tooltip
                                                content={
                                                    <div>
                                                        {option.description}
                                                    </div>
                                                }
                                            >
                                                <FontAwesomeIcon icon={option.icon} />
                                            </Tooltip>
                                        </OptionIconWrapper>
                                    );
                                })}
                            </ActionActionsPanelHover>
                        </ActionContentHover>
                    </FloatingAction>
                ) : (null)}
            </FloatingActionsContainer>
        );

        return ReactDOM.createPortal(contentNode, document.body);
    }
}

export default FloatingActionProviderRaw;