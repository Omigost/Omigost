import * as React from "react";
import { I18n } from "react-polyglot";
import { BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import ModulesProvider, { withModules, WithLoaderProps } from "modules/ModulesProvider";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faUserCircle, faTachometerAlt, faSearchDollar,
    faTools, faChartBar, faDownload, faUpload, faShieldAlt,
    faCommentAlt, faFlag, faPlus, faDollarSign,
    faRulerHorizontal, faRulerVertical, faChartArea, faClock, faChartLine
} from '@fortawesome/free-solid-svg-icons';

library.add(
     faUserCircle, faTachometerAlt, faSearchDollar,
     faTools, faChartBar, faDownload, faUpload, faShieldAlt,
     faCommentAlt, faFlag, faPlus, faDollarSign,
     faRulerHorizontal, faRulerVertical, faChartArea, faClock, faChartLine
);

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

const locale = "en";
import messages from "langs/en";
import routes from "routes/index";
import defaultTheme from "themes/default";

export interface AppProps {
}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        const RoutesModuleComponent = withModules((props: WithLoaderProps) => {
            return (
                <div>
                    {routes(props.modulesLoader)}
                </div>
            );
        });

        return (
            <I18n locale={locale} messages={messages}>
                <ThemeProvider theme={defaultTheme}>
                    <ModulesProvider modules={[ "dashboard-view", "settings-view" ]}>
                        <Router>
                            <AppWrapper>
                                <RoutesModuleComponent />
                            </AppWrapper>
                        </Router>
                    </ModulesProvider>
                </ThemeProvider>
            </I18n>
        );
    }
}
