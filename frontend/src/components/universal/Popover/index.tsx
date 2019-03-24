import * as React from "react";
import styled from "styled-components";

import * as ReactPopover from 'react-awesome-popover';
import "react-awesome-popover/dest/react-awesome-popover.css";
import "./index.scss";

const PopoverTrigger = styled.div`
`;

const PopoverContent = styled.div`
  background: white;
  /* Box shadow is the default style for popover extracted from react-awesome-popover */
  box-shadow: 0 8px 24px rgba(16, 22, 26, 0.2);
  padding: 10px;
  width: 200px;
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
