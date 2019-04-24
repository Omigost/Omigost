import * as React from "react";
import styled  from "styled-components";

import CardDescription from "components/CardDescription";
import CardImage from "components/CardImage";
import CardTitle from "components/CardTitle";

const Wrapper = styled.div`
  padding: 1.2vw;
  margin: 1vw;
  width: 80%;
  background: white;
  border-left: solid 2px ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.colors.accent};
  
  border-radius: 0.5vw;
  box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
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

const ActionWrapper = styled.div`
  float: right;
  position: relative;
  right: 1vw;
  top: -2vw;
`;

export interface CardProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    image?: string;
    action?: React.ReactNode;
}

export default class Card extends React.Component<CardProps, undefined> {

    render() {
        return (
            <Wrapper>
                <ContentRow>
                    {
                        (!this.props.image) ? (null) :(
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
                        (!this.props.description) ? (null) :(
                            <div style={{...((!this.props.title) ? ({ width: '100%' }) : ({}))}} >
                                <CardDescription>
                                    {this.props.description}
                                </CardDescription>
                            </div>
                        )
                    }
                </ContentRow>
                <ActionWrapper>
                    {this.props.action}
                </ActionWrapper>
            </Wrapper>
        );
    }
}
