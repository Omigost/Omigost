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

class TestAppRoot extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        );
    }
}

export default TestAppRoot;