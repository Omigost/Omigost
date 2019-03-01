import * as React from 'react';
import styled  from 'styled-components';

interface WrapperProps {
  fontSize?: string;
  theme: any;
};

const Wrapper = styled.div`
  color: ${(props: WrapperProps) => props.theme.colors.accent};
  font-family: ${(props: WrapperProps) => props.theme.primaryFont};
  font-size: ${(props: WrapperProps) => props.theme.fontSize[props.fontSize || 'default']};
`;

export interface CardDescriptionProps {
    children: string;
};

export default class CardDescription extends React.Component<CardDescriptionProps, undefined> {
    
    render() {
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}
