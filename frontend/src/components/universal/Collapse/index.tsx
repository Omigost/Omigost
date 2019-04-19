import * as React from "react";
import styled from "styled-components";

import { Collapse as CollapseComponent } from 'react-collapse';

export interface CollapseProps {
    collapsed: boolean;
}

export default class Collapse extends React.Component<CollapseProps, undefined> {
    render() {
        return (
            <CollapseComponent
                isOpened={!this.props.collapsed}
            >
                {this.props.children}
            </CollapseComponent>
        );
    }
}
