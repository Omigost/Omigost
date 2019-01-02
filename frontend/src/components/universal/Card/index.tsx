import * as React from 'react';
import styled  from 'styled-components';

const Wrapper = styled.div`
  padding: 1.2vw;
  margin: 1vw;
  width: 100%;
  background: 'gray';
  border-left: solid 2px ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.colors.accent};
`;

export interface CardProps {
    children: React.ReactNode;
}

export default class Card extends React.Component<CardProps, undefined> {
    
    render() {
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}
