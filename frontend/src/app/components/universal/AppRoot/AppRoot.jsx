import React from 'react'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from 'reducers/reducers.js'
import * as actions from 'reducers/actions.js'
import routes from 'routes/routes.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(
        Object.assign({}, reducers, {
            routing: routerReducer
        })
    ),
    composeEnhancers(applyMiddleware(thunk))
);

const history = syncHistoryWithStore(browserHistory, store);

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inited: false
        };
    }

    componentDidMount() {
        this.setState({
            inited: true
        });
    }

    render() {
      return (
          <Router history={history}>
              {
                  routes
              }
          </Router>
      );
    }
}

const mapStateToProps = state => {
    return {
        content: state.app.content
    }
}

const mapDispatchToProps = dispatch => {
    window.loadPrefetchedContent = (content) => {
        console.warn("Install prefetched content");
        dispatch(actions.fetchedContent(Object.assign({}, content, {
            loaded: true
        })));
    };
    return {
        fetchedContent: (content) => dispatch(actions.fetchedContent(content))
    }
}

const AppRouterConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter)


class AppRoot extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppRouterConnected />
            </Provider>
        );
    }
}

export default AppRoot;