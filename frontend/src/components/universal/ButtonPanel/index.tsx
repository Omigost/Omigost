import * as React from 'react';
import styled  from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const Wrapper = styled.div`
  padding: 1.2vw;
  width: 100%;
`;

interface ButtonComponentProps {
  fontSize?: string;
  theme?: any;
  showIcon?: boolean;
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

const IconWrapper = styled.div<ButtonComponentProps>`
  font-size: ${(props: ButtonComponentProps) => props.theme.fontSize[props.fontSize || 'XXL']};
  padding: ${(props: ButtonComponentProps) => {
      if(props.showIcon) {
          return '1vw';
      }
      return 0;
  }};
`;

const LabelWrapper = styled.div<ButtonComponentProps>`
  margin-top: ${(props: ButtonComponentProps) => {
      if(props.showIcon) {
          return '1vw';
      }
      return 0;
  }};
`;

export interface ButtonPanelProps {
    size?: string;
    children?: any;
    onClick?: (event?: any) => void;
    icon?: IconName;
}

export default class ButtonPanel extends React.Component<ButtonPanelProps, undefined> {
    render() {
        return (
            <Wrapper>
                <ButtonComponent
                    fontSize={this.props.size}
                    onClick={this.props.onClick}
                >
                    {
                        (!this.props.icon)?(null):(
                            <IconWrapper showIcon>
                                <FontAwesomeIcon icon={this.props.icon} />
                            </IconWrapper>
                        )
                    }
                    <LabelWrapper showIcon={!!this.props.icon}>
                        {this.props.children}
                    </LabelWrapper>
                </ButtonComponent>
            </Wrapper>
        );
    }
}
