import * as React from 'react';
import styled from 'styled-components';

import SinglePage from './SinglePage';
import FillPage from './FillPage';
import Logo from 'components/Logo';


const Wrapper = styled.div`
  background: ${props => props.theme.colors.background};
  margin: 0;
  padding: 0;
  width: 100vw;
`;

const LogoWrapper = styled.div`
  width: 8vw;
  margin-left: 2vw;
  margin-top: 1vw;
`;

const ContentWrapper = styled.div`
  font-size: ${props => props.theme.fontSize.default};
  color: ${props => props.theme.colors.primaryText};
  font-family: ${props => props.theme.primaryFont};
`;

export interface PageProps {
    type?: string
}

export default class Page extends React.Component<PageProps, undefined> {
    render() {
        let PageComponent = SinglePage;
        
        if(this.props.type === 'fill') {
            PageComponent = FillPage;
        }
        
        return (
            <Wrapper>
                {
                    (this.props.type === 'fill')?(null):(
                        <LogoWrapper>
                            <Logo />
                        </LogoWrapper>
                    )
                }
                <ContentWrapper>
                    <PageComponent {...this.props} />
                </ContentWrapper>
            </Wrapper>
        );
    }
}
