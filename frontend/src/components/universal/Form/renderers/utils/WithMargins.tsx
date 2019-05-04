import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-top: 1vw;
    width: 100%;
`;

export interface WithMarginsProps {
    parent: any;
}

export default class WithMargins extends React.Component<WithMarginsProps, undefined> {
    render() {
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}