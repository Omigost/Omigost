import * as React from "react";
import styled from "styled-components";

import * as ReactPopover from 'react-awesome-popover';
import "react-awesome-popover/dest/react-awesome-popover.css";
import "./index.scss";

const PopoverTrigger = styled.div`
`;

const PopoverContent = styled.div`
  background:white;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
  padding: 10px;
  width: 200px;
  z-index: 9999999;
`;

export interface PopoverProps {
    content?: React.ReactNode;
};

export default class Popover extends React.Component<PopoverProps, undefined> {
    render() {
        if(!this.props.content) {
            return this.props.children || null;
        }
        
        return (
            <ReactPopover>
                <PopoverTrigger>
                    {this.props.children}
                </PopoverTrigger>
                <PopoverContent>
                    {this.props.content}
                </PopoverContent>
            </ReactPopover>
        );
    }
}
