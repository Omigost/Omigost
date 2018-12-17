import * as React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { I18n } from 'react-polyglot';

import LoginPage from 'pages/Loading';

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

const locale = 'en';
import messages from 'langs/en';

import defaultTheme from 'themes/default';

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <I18n locale={locale} messages={messages}>
                <ThemeProvider theme={defaultTheme}>
                    <AppWrapper>
                        <LoginPage />
                    </AppWrapper>
                </ThemeProvider>
            </I18n>
        );
    }
}