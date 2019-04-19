import * as React from "react";
import { I18n } from "react-polyglot";
import styled, { ThemeProvider } from "styled-components";

import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { routerMiddleware } from "connected-react-router";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import thunk from "redux-thunk";

import { executeAppInit } from "../redux/actions";
import createRootReducer from "../redux/reducers";
import preloadedState from "../redux/store";

import ModulesProvider, { withModules, WithLoaderProps } from "modules/ModulesProvider";

const AppWrapper = styled.div`
  background: ${props => props.theme.colors.background};
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

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
    const store = createStore(
        combineReducers({
            router: connectRouter(history),
            ...createRootReducer(history),
        }),
        preloadedState,
        composeEnhancers(
            applyMiddleware(routerMiddleware(history)),
            applyMiddleware(thunk),
        ),
    );

    return store;
}

const store = configureStore();

export default class App extends React.Component<AppProps, undefined> {
    
    componentDidMount() {
        store.dispatch(executeAppInit());
    }
    
    render() {
        const RoutesModuleComponent = withModules((props: WithLoaderProps) => {
            return (
                <div>
                    {routes(props.modulesLoader)}
                </div>
            );
        });

        return (
            <Provider store={store}>
                <I18n locale={locale} messages={messages}>
                    <ThemeProvider theme={defaultTheme}>
                        <ModulesProvider modules={[ "dashboard-view", "budgets-view", "settings-view" ]}>
                            <ConnectedRouter history={history}>
                                <AppWrapper>
                                    <RoutesModuleComponent />
                                </AppWrapper>
                            </ConnectedRouter>
                        </ModulesProvider>
                    </ThemeProvider>
                </I18n>
            </Provider>
        );
    }
}
