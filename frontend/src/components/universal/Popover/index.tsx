import * as React from "react";
import styled from "styled-components";

import TooltipComponent from "rc-tooltip";
import "./index.scss";

const PopoverTrigger = styled.div`
`;

const PopoverContent = styled.div`
  width: 100%;
  height: 100%;
`;

export interface PopoverProps {
    content?: React.ReactNode;
}

interface PopoverState {
    isOpen: boolean;
}

export default class Popover extends React.Component<PopoverProps, PopoverState> {
    state: PopoverState;
    
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false,
        };
    }
    
    render() {
        if (!this.props.content) {
            return this.props.children || null;
        }

        return (
            <TooltipComponent
                prefixCls={"rc-popover rc-tooltip"}
                destroyTooltipOnHide
                placement="right"
                trigger={"click"}
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
        );
        
        /*return (
            <ReactPopover
                open={this.state.isOpen}
                onOpen={() => this.setState({ isOpen: true })}
                onClose={() => this.setState({ isOpen: false })}
            >
                <PopoverTrigger>
                    {this.props.children}
                </PopoverTrigger>
                <PopoverContent>
                    {this.props.content}
                </PopoverContent>
            </ReactPopover>
        );*/
    }
}
