import * as React from 'react';
import styled  from 'styled-components';

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

interface ButtonComponentProps {
  fontSize?: string;
  theme?: any;
};

const ButtonComponent = styled.button<ButtonComponentProps>`
  background: transparent;
  border: 0.2vw solid ${(props: ButtonComponentProps) => props.theme.colors.accent};
  font-family: ${(props: ButtonComponentProps) => props.theme.primaryFont};
  font-size: ${(props: ButtonComponentProps) => props.theme.fontSize[props.fontSize || 'default']};
  color: ${(props: ButtonComponentProps) => props.theme.colors.accent};
  padding-left: 3.5vw;
  padding-right: 3.5vw;
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  width: 100%;
`;

export interface ButtonPanelProps {
    size?: string;
    children?: any;
    onClick?: (event?: any) => void;
}

export default class ButtonPanel extends React.Component<ButtonPanelProps, undefined> {
    render() {
        return (
            <Wrapper>
                <ButtonComponent
                    fontSize={this.props.size}
                    onClick={this.props.onClick}
                >
                    {this.props.children}
                </ButtonComponent>
            </Wrapper>
        );
    }
}
