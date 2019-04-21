import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import TooltipComponent from "rc-tooltip";

const Wrapper = styled.div``;

const GlobalStyle = createGlobalStyle`
    .rc-popover.rc-tooltip {
        font-family: ${(props: ButtonComponentProps) => props.theme.primaryFont};
    }

    .rc-popover.rc-tooltip {
        z-index: 9999999 !important;
    }

    .rc-popover.rc-tooltip .rc-tooltip-inner {
        background-color: white;
        box-shadow: 0 8px 24px rgba(16, 22, 26, 0.2);
        padding: 1vw;
    }

    .rc-popover.rc-tooltip.rc-tooltip-placement-right .rc-tooltip-arrow {
        border-right-color: white;
    }

    .rc-popover-error.rc-tooltip .rc-tooltip-inner {
        background-color: ${(props) => props.theme.colors.primary};
    }

    .rc-popover-error.rc-tooltip.rc-tooltip-placement-right .rc-tooltip-arrow {
        border-right-color: ${(props) => props.theme.colors.primary};
        color: white;
    }
`;

const PopoverTrigger = styled.div`
`;

const PopoverContent = styled.div`
  width: 100%;
  height: 100%;
`;

export interface PopoverProps {
    content?: React.ReactNode;
    placement?: string;
    type?: string;
    trigger?: string;
}

export default class Popover extends React.Component<PopoverProps, undefined> {
   
    render() {
        if (!this.props.content) {
            return this.props.children || null;
        }

        return (
            <Wrapper>
                <GlobalStyle />
                <TooltipComponent
                    prefixCls={`rc-popover rc-popover-${this.props.type} rc-tooltip`}
                    destroyTooltipOnHide
                    placement={this.props.placement || "right"}
                    trigger={(this.props.trigger) ? ([ this.props.trigger ]) : ("click")}
                    overlay={
                        <PopoverContent theme={this.props.theme}>
                            {this.props.content}
                        </PopoverContent>
                    }
                >
                    <PopoverTrigger>
                        {this.props.children}
                    </PopoverTrigger>
                </TooltipComponent>
            </Wrapper>
        );
    }
}
