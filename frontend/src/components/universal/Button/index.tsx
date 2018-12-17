import * as React from 'react';
import styled  from 'styled-components';

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

interface ButtonComponentProps {
  fontSize?: string,
  theme?: any
};

const ButtonComponent = styled.button<ButtonComponentProps>`
  background: ${(props: ButtonComponentProps) => props.theme.colors.primaryGradient};
  border: none;
  font-family: ${(props: ButtonComponentProps) => props.theme.primaryFont};
  font-size: ${(props: ButtonComponentProps) => props.theme.fontSize[props.fontSize || 'default']};
  color: ${(props: ButtonComponentProps) => props.theme.colors.lightAccent};
  padding-left: 3.5vw;
  padding-right: 3.5vw;
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  width: 100%;
`;

export interface ButtonProps {
    size?: string,
    children?: any
}

export default class Button extends React.Component<ButtonProps, undefined> {
    render() {
        return (
            <Wrapper>
                <ButtonComponent
                    fontSize={this.props.size}
                >
                    {this.props.children}
                </ButtonComponent>
            </Wrapper>
        );
    }
}
