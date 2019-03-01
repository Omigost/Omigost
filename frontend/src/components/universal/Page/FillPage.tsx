import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 0;
  margin-top: 0;
  padding: 0;
  width: 100vw;
`;

export interface FillPageProps {
}

export default class FillPage extends React.Component<FillPageProps, undefined> {
    render() {
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}
