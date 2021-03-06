import * as React from "react";
import styled  from "styled-components";

interface WrapperProps {
  fontSize?: string;
  theme?: any;
}

const Wrapper = styled.div<WrapperProps>`
  color: ${(props: WrapperProps) => props.theme.colors.accent};
  font-family: ${(props: WrapperProps) => props.theme.primaryFont};
  font-size: ${(props: WrapperProps) => props.theme.fontSize[props.fontSize || "XL"]};
`;

export interface CardTitleProps {
    children: React.ReactNode;
    fontSize?: string;
}

export default class CardTitle extends React.Component<CardTitleProps, undefined> {

    render() {
        return (
            <Wrapper fontSize={this.props.fontSize}>
                {this.props.children}
            </Wrapper>
        );
    }
}
