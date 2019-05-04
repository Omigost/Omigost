import * as React from "react";

import { Route } from "react-router-dom";

import RequestLimitsPage from "pages/BudgetLimitRequestPage";
import DashboardPage from "pages/Dashboard";
import LoadingPage from "pages/Loading";
import LoginPage from "pages/Login";

import { ModulesLoader } from "modules/ModulesProvider";

const ROUTES = {
    "/": LoginPage,
    "/home": DashboardPage,
    "/login": LoginPage,
    "/loading": LoadingPage,
    "/requestBudgetLimit": RequestLimitsPage,
};

function mapper(key, index, options) {
    return (
        <Route
          exact={index === 0}
          key={`route-${index}-${key}`}
          path={key}
          component={options}
        />
    );
}

export default function(modulesLoader: ModulesLoader) {
    const baseRoutes = Object.keys(ROUTES)
      .map((key, index) => mapper(key, index, ROUTES[key]))
      .filter(e => !!e);

    const loaderRoutes = modulesLoader
      .getRegisteredRoutes()
      .map((route, index) => mapper(route.name, index, route.component))
      .filter(e => !!e);

    return baseRoutes.concat(loaderRoutes);
}