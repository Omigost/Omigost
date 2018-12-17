import * as React from 'react';
import styled from 'styled-components';

import Loading from 'components/Loading';
import TextBox from 'components/TextBox';

const LoadingWrapper = styled.div`
  width: 20vw;
  margin-left: 10vw;
`;

const Wrapper = styled.div`
  text-align: center;
  width: 40vw;
  margin-left: 20vw;
`;

const LoadingMessageWrapper = styled.div`
  width: 40vw;
  text-align: center;
`;

export interface LoadingPanelProps {
}

const WELCOME_MESSAGES_COUNT = 4;

export default class LoadingPanel extends React.Component<LoadingPanelProps, undefined> {
    render() {
        
        let welcomeMessageIndex = Math.floor(Math.random()*WELCOME_MESSAGES_COUNT);
        if(welcomeMessageIndex == 0) {
            welcomeMessageIndex = WELCOME_MESSAGES_COUNT;
        }
        
        return (
            <Wrapper>
                <LoadingWrapper>
                    <Loading />
                </LoadingWrapper>
                <LoadingMessageWrapper>
                    <TextBox size='XXL' translate>{`welcome_message_${welcomeMessageIndex}`}</TextBox>
                    <TextBox size='M'>
                        Loading various things...
                    </TextBox>
                </LoadingMessageWrapper>
            </Wrapper>
        );
    }
};