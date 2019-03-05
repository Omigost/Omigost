import * as React from "react";
import styled  from "styled-components";

import Logo, { LogoType } from "components/Logo";

const Wrapper = styled.div`
  width: 3vw;
  display: inline-block;
`;

export interface CardImageProps {
    src: LogoType | string;
}

export default class CardImage extends React.Component<CardImageProps, undefined> {

    render() {
        return (
            <Wrapper>
                <Logo type={this.props.src} />
            </Wrapper>
        );
    }
}
