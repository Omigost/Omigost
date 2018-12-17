import * as React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import Page from 'components/Page';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Description from 'components/Description';

const AppWrapper = styled.div`
  background: ${props => props.theme.colors.background};
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  border: none;
  position: absolute;
  left: 0;
  top: 0;
`;

const theme = {
  primaryFont: 'Raleway, sans-serif',
  colors: {
    background: '#F7F7F7',
    primary: '#EB3349',
    secondary: '#F45C43',
    primaryText: '#1B0000',
    accent: '#474747',
    primaryGradient: 'linear-gradient(to right, #EB3349, #F45C43)',
    lightAccent: 'white'
  },
  fontSize: {
    S: '0.7vw',
    default: '1vw',
    M: '1.2vw',
    XL: '2vw',
    XXL: '3vw',   
  },
};

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <AppWrapper>
                    <Page>
                        <Description text='Hello here!' size='XL'>
                            <TextInput size='XXL' type='password' label='Hello'/>
                            <Button size='XL'>
                                Hello!
                            </Button>
                        </Description>
                    </Page>
                </AppWrapper>
            </ThemeProvider>
        );
    }
}
