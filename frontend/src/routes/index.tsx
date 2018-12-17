import * as React from 'react';

import { Route } from 'react-router-dom';

import LoginPage from 'pages/Login';
import LoadingPage from 'pages/Loading';
import DashboardPage from 'pages/Dashboard';

const ROUTES = {
    '/home': DashboardPage,
    '/login': LoginPage,
    '/loading': LoadingPage,
    '/': LoginPage
};

function mapper(key, index, options) {
    return (
        <Route
          exact
          key={`route-${index}-${key}`}
          path={key}
          component={options}
        />
    );
};

export default Object.keys(ROUTES).map((key, index) => mapper(key, index, ROUTES[key])).filter(e => !!e);