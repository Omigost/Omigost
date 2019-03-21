import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 4vw;
  margin-top: 4vw;
  padding: 0;
  width: 80vw;
`;

export interface SinglePageProps {
}

export default class SinglePage extends React.Component<SinglePageProps, undefined> {
    render() {
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}
