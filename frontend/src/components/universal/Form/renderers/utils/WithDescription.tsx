import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  font-family: ${(props: ButtonComponentProps) => props.theme.primaryFont};
  font-size: 1.4vw;
  display: inline-block;
`;

const DescriptionWrapper = styled.div`
  font-family: ${(props: ButtonComponentProps) => props.theme.primaryFont};
  font-size: 1vw;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-left: 1vw;
`;

const TextWrapperInlineLabel = styled.div`
  display: inline-block;
  float: left;
  width: 25%;
`;

const ContentWrapperInlineLabel = styled.div`
  margin-left: 1vw;
  display: inline-block;
`;

const TitleExtraWrapper = styled.div`
  display: inline-block;
  margin-right: 1vw;
`;

export interface WithDescriptionProps {
    parent: any;
    titleExtra?: any;
}

export enum LayoutMode {
    NORMAL = "normal",
    INLINE_LABEL = "inlineLabel",
}

export default class WithDescription extends React.Component<WithDescriptionProps, undefined> {
    render() {
        
        let layout = this.props.parent.getSchema().layout || LayoutMode.NORMAL;
        
        const titleExtraNode = (this.props.titleExtra) ? (
            <TitleExtraWrapper>
                {this.props.titleExtra}
            </TitleExtraWrapper>
        ) : (null);
        
        switch(layout) {
            case LayoutMode.NORMAL: {
                return (
                    <Wrapper>
                        <TitleWrapper>
                            {titleExtraNode}
                            {this.props.parent.getSchema().title}
                        </TitleWrapper>
                        <DescriptionWrapper>
                            {this.props.parent.getSchema().description}
                        </DescriptionWrapper>
                        <ContentWrapper>
                            {this.props.children}
                        </ContentWrapper>
                    </Wrapper>
                );
            }
            case LayoutMode.INLINE_LABEL: {
                return (
                    <Wrapper>
                        <TextWrapperInlineLabel>
                            <TitleWrapper>
                                {titleExtraNode}
                                {this.props.parent.getSchema().title}
                            </TitleWrapper>
                            <DescriptionWrapper>
                                {this.props.parent.getSchema().description}
                            </DescriptionWrapper>
                        </TextWrapperInlineLabel>
                        <ContentWrapperInlineLabel>
                            {this.props.children}
                        </ContentWrapperInlineLabel>
                    </Wrapper>
                );
            }
            default: {
                return this.props.children;
            }
        }
    }
}