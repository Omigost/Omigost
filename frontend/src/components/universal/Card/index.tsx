import * as React from 'react';
import styled  from 'styled-components';

import CardImage from 'components/CardImage';
import CardTitle from 'components/CardTitle';
import CardDescription from 'components/CardDescription';

const Wrapper = styled.div`
  padding: 1.2vw;
  margin: 1vw;
  width: 100%;
  background: 'gray';
  border-left: solid 2px ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.colors.accent};
`;

const ContentRow = styled.div`
 display: flex;
`;

const CardImageWrapper = styled.div`
  flex: 50%;
`;

const CardTitleWrapper = styled.div`
  flex: 50%;
`;

export interface CardProps {
    title: string;
    description?: string;
    image?: string;
}

export default class Card extends React.Component<CardProps, undefined> {
    
    render() {
        return (
            <Wrapper>
                <ContentRow>
                    {
                        (!this.props.image)?(null):(
                            <CardImageWrapper>
                                <CardImage src={this.props.image} />
                            </CardImageWrapper>
                        )
                    }
                    <CardTitleWrapper>
                        <CardTitle>
                            {this.props.title}
                        </CardTitle>
                    </CardTitleWrapper>
                </ContentRow>
                <ContentRow>
                    {
                        (!this.props.description)?(null):(
                            <div>
                                <CardDescription>
                                    {this.props.description}
                                </CardDescription>
                            </div>
                        )
                    }
                </ContentRow>
            </Wrapper>
        );
    }
}
