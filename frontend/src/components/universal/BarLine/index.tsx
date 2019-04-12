import * as React from "react";
import styled  from "styled-components";

import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import "./index.scss";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const DEFAULT_PRECISION = 0;

export interface BarLineProps {
    value: number;
    precision?: number;
}

export default class BarLine extends React.Component<BarLineProps, undefined> {
    render() {
        return (
            <Wrapper>
                <Progress
                    status="active"
                    percent={parseFloat(this.props.value.toFixed(this.props.precision || DEFAULT_PRECISION))}
                    style={{ height: "1vw" }}
                />
            </Wrapper>
        );
    }
}
