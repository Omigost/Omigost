import * as React from "react";
import { I18n } from "react-polyglot";
import styled from "styled-components";

import { connectRouter, routerMiddleware, ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { executeAppInit } from "../redux/actions";
import createRootReducer from "../redux/reducers";
import preloadedState from "../redux/store";

import ModulesProvider, { withModules, WithLoaderProps } from "modules/ModulesProvider";
import FloatingActionProvider from "./universal/FloatingActionProvider";
import { executeSetTheme, ThemeProvider } from "./universal/ThemeProvider";
import ToastProvider from "./universal/ToastProvider";

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

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
        store.dispatch(executeSetTheme(defaultTheme));
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
                <ToastProvider />
                <I18n locale={locale} messages={messages}>
                    <ThemeProvider>
                        <ModulesProvider modules={[ "dashboard-view", "budgets-view", "users-view", "settings-view", "design-guide" ]}>
                            <ConnectedRouter history={history}>
                                <AppWrapper>
                                    <FloatingActionProvider />
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
