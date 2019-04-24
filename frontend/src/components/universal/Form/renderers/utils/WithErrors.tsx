import * as React from "react";
import styled from "styled-components";

import Popover from "../../../Popover";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
    width: 100%;
`;

export interface WithErrorsProps {
    context: any;
    parent: any;
}

const ErrorIcon = styled.div`
  display: inline-block;
  height: 3vw;
  margin-right: 1vw;
  padding-right: 0.5vw;
  padding-top: 0.7vw;
  border-right: 0.15vw solid ${(props) => props.theme.colors.primary};
`;

const NoErrorIcon = styled.div`
  display: inline-block;
  height: 3vw;
  margin-right: 1vw;
  padding-right: 0.5vw;
  padding-top: 0.7vw;
  border-right: 0.15vw solid transparent;
`;

interface IconWrapperProps {
    theme: any;
    isVisible: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  color: ${(props) => props.theme.colors.primary};
  opacity: ${(props) => ((props.isVisible) ? (1) : (0))};
`;

const Content = styled.div`
  display: inline-block;
  width: 80%;
`;

const ErrorPopoverLabel = styled.span`
    margin-left: 0.3vw;
    font-weight: bold;
`;

const ErrorContainer = styled.div`
    max-width: 10vw;
`;

export default class WithErrors extends React.Component<WithErrorsProps, undefined> {
    render() {
        const errors = this.props.context.getErrorsForNode(this.props.parent) || [];

        const iconNode = (
            <Popover
                type={"error"}
                placement={"left"}
                trigger={"hover"}
                content={(errors.length === 0) ? (null) : (
                    <ErrorContainer>
                        <div>
                            <FontAwesomeIcon icon={faExclamationTriangle.iconName} />
                            <ErrorPopoverLabel>
                                Error!
                            </ErrorPopoverLabel>
                        </div>
                        {errors[0].message}
                    </ErrorContainer>
                )}
            >
                <IconWrapper isVisible={errors.length !== 0}>
                    <FontAwesomeIcon icon={faExclamationTriangle.iconName} />
                </IconWrapper>
            </Popover>
        );

        return (
            <Wrapper>
                {
                    (errors.length === 0) ? (
                        <NoErrorIcon>
                            {iconNode}
                        </NoErrorIcon>
                    ) : (
                        <ErrorIcon>
                            {iconNode}
                        </ErrorIcon>
                    )
                }
                <Content>
                    {this.props.children}
                </Content>
            </Wrapper>
        );
    }
}