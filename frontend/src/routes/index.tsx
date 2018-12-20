import * as React from 'react';

import { Route } from 'react-router-dom';

import LoginPage from 'pages/Login';
import LoadingPage from 'pages/Loading';
import DashboardPage from 'pages/Dashboard';

import { ModulesLoader, WithLoaderProps } from 'modules/ModulesProvider';

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

export default function(modulesLoader: ModulesLoader) {
    let baseRoutes = Object.keys(ROUTES)
      .map((key, index) => mapper(key, index, ROUTES[key]))
      .filter(e => !!e);
      
    let loaderRoutes = modulesLoader
      .getRegisteredRoutes()
      .map((route, index) => mapper(route.name, index, route.component))
      .filter(e => !!e);
        
    return baseRoutes.concat(loaderRoutes);
};