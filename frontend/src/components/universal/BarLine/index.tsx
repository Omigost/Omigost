import * as React from "react";
import styled  from "styled-components";

import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import "./index.scss";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export interface BarLineProps {
    value: number;
}

export default class BarLine extends React.Component<BarLineProps, undefined> {
    render() {
        return (
            <Wrapper>
                <Progress status='active' percent={this.props.value} style={{ height: "1vw" }} />
            </Wrapper>
        );
    }
}
