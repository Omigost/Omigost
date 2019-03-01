import * as React from "react";
import styled from "styled-components";

const logoAnimated = require("img/omigost_single_animated.svg");

const Wrapper = styled.div`
  border: none;
  padding: 1.2vw;
  width: 100%;
`;

const ImgHolder = styled.img`
  width: 100%
`;

export interface LoadingProps {
}

export default class Loading extends React.Component<LoadingProps, undefined> {
    render() {
        return (
            <Wrapper>
                <ImgHolder src={logoAnimated}/>
            </Wrapper>
        );
    }
}