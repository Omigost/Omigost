import * as React from 'react';
import styled  from 'styled-components';

import Text from 'components/Text';

interface WrapperProps {
  fontSize?: string,
  theme?: any
};

const Wrapper = styled.div<WrapperProps>`
  color: ${(props: WrapperProps) => props.theme.colors.primaryText};
  font-family: ${(props: WrapperProps) => props.theme.primaryFont};
  font-size: ${(props: WrapperProps) => props.theme.fontSize[props.fontSize || 'default']};
`;


export interface TextBoxProps {
    size?: string,
    children?: any,
    compact?: boolean,
    translate?: boolean,
}

export default class TextBox extends React.Component<TextBoxProps, undefined> {
    render() {
        return (
            <Wrapper fontSize={this.props.size}>
                <Text
                  compact={this.props.compact}
                  translate={this.props.translate}
                >
                    {this.props.children}
                </Text>
            </Wrapper>
        );
    }
}
