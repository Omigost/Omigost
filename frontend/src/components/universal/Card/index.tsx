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

const CardImageCell = styled.td`
  padding-top: 0;
`;

const CardTitleCell = styled.td`
  padding-top: 0;
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
                <table>
                    <tbody>
                        <tr>
                            {
                                (!this.props.image)?(null):(
                                    <CardImageCell>
                                        <CardImage src={this.props.image} />
                                    </CardImageCell>
                                )
                            }
                            <CardTitleCell>
                                <CardTitle>
                                    {this.props.title}
                                </CardTitle>
                            </CardTitleCell>
                        </tr>
                    </tbody>
                </table>
                {
                    (!this.props.description)?(null):(
                        <div>
                            <CardDescription>
                                {this.props.description}
                            </CardDescription>
                        </div>
                    )
                }
            </Wrapper>
        );
    }
}
