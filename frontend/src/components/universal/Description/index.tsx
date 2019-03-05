import * as React from "react";
import styled  from "styled-components";

interface WrapperProps {
  fontSize?: string;
  theme?: any;
}

const Wrapper = styled.div<WrapperProps>`
  border: none;
  font-family: ${(props: WrapperProps) => props.theme.primaryFont};
  font-size: ${(props: WrapperProps) => props.theme.fontSize[props.fontSize || "default"]};
  color: ${(props: WrapperProps) => props.theme.colors.lightAccent};
  padding: 1.2vw;
  width: 100%;
`;

interface ContentWrapperProps {
  fontSize?: string;
  theme?: any;
}

const ContentWrapper = styled.td<ContentWrapperProps>`
  width: 50%;
`;

interface DescriptionWrapperProps {
  fontSize?: string;
  theme?: any;
}

const DescriptionWrapper = styled.td<DescriptionWrapperProps>`
  width: 45%;
  padding-left: 10vw;
  height: 1px;
`;

const Divider = styled.div<DescriptionWrapperProps>`
  background: ${props => props.theme.colors.primaryGradient};
  height: 100%;
  width: 0.30vw;
  min-height: 13vw;
  float: left;
  margin-right: 3vw;
`;

const Table = styled.table`
  width: 100%;
`;

interface DescriptionTextWrapperProps {
  fontSize?: string;
  theme?: any;
}

const DescriptionTextWrapper = styled.div<DescriptionTextWrapperProps>`
  color: ${(props: DescriptionTextWrapperProps) => props.theme.colors.primaryText};
  font-family: ${(props: DescriptionTextWrapperProps) => props.theme.primaryFont};
  font-size: ${(props: DescriptionTextWrapperProps) => props.theme.fontSize[props.fontSize || "default"]};
`;


export interface DescriptionProps {
    size?: string;
    children?: any;
    text?: any;
}

export default class Description extends React.Component<DescriptionProps, undefined> {
    render() {
        return (
            <Wrapper fontSize={this.props.size}>
                <Table>
                    <tbody>
                        <tr>
                            <ContentWrapper>
                                {this.props.children}
                            </ContentWrapper>
                            <DescriptionWrapper>
                                <Divider />
                                <DescriptionTextWrapper fontSize={this.props.size}>
                                    {this.props.text}
                                </DescriptionTextWrapper>
                            </DescriptionWrapper>
                        </tr>
                    </tbody>
                </Table>
            </Wrapper>
        );
    }
}
